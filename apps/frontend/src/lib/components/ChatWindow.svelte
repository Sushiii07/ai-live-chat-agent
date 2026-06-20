<script lang="ts">
    import MessageList from "$lib/components/MessageList.svelte";
    import MessageInput from "$lib/components/InputBar.svelte";
    import { getSessionId } from "$lib/session";
	import { onMount } from "svelte";
    import { tick } from "svelte";

    type Message = {
        id: number;
        role: 'user' | 'ai';
        content: string;
    };
    
    let messages = $state<Message[]>([]);
    let messageArea: HTMLDivElement | null = null;

    onMount(async () => {
        const session_id = getSessionId();
        try {
            const response = await fetch(`http://localhost:3000/api/chat/${session_id}`);
            if (response.ok) {
                const pastMessages = await response.json();
                if (pastMessages.length > 0) {
                    messages = pastMessages;
                }
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
    });

    async function sendMessage(content: string) {
        messages.push({
            id: Date.now(),
            role: 'user',
            content
        });
        
        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: content,
                    sessionId: getSessionId()
                })
            })
            if (!response.ok) {
                throw new Error('Server rejected the request');
            }

            const data = await response.json()
            if (data) {
                messages.push(data);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    }

    $effect(() => {
        messages.length;
        scrollToBottom();
    });

    async function scrollToBottom() {
        await tick();

        if (!messageArea) return;

        messageArea.scrollTo({
            top: messageArea.scrollHeight,
            behavior: "smooth"
        });
    }
</script>

<div class="wrapper">
    <div class="container">
        <h1>Chat Window</h1>
        <div class="message-area" bind:this={messageArea}>
            <MessageList {messages} />
        </div>
        <div class="input-area">
            <MessageInput onSend={sendMessage} />
        </div>
    </div>
</div>


<style>
    .wrapper {
        display: flex;
        justify-content: center;
        height: 100vh;
        width: 100%;
    }
    .container {
        width: 60%;
        height: calc(100vh - 20px);
        padding: 10px;
        display: flex;
        flex-direction: column;
    }

    .message-area {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        scrollbar-gutter: stable;
        min-height: 0;

        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: rgba(150,150,150,0.5) transparent;
    }

    .message-area::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .message-area:hover::-webkit-scrollbar-thumb {
        background: rgba(150,150,150,0.5);
    }

    .input-area {
        position: sticky;
        bottom: 0;
        padding-top: 10px;
    }
</style>