<script lang="ts">
    import MessageList from "$lib/components/MessageList.svelte";
    import MessageInput from "$lib/components/InputBar.svelte";
    import { getSessionId } from "$lib/session";

    type Message = {
        id: number;
        role: 'user' | 'ai';
        content: string;
    };
    
    let messages = $state<Message[]>([]);

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
</script>

<div class="wrapper">
    <div class="container">
        <h1>Chat Window</h1>
        <MessageList {messages} />
        <MessageInput onSend={sendMessage} />
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
        border-radius: 26px;
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>