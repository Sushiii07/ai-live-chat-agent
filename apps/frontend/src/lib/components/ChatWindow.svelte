<script lang="ts">
    import MessageList from "$lib/components/MessageList.svelte";
    import MessageInput from "$lib/components/InputBar.svelte";

    type Message = {
        id: number;
        role: 'user' | 'assistant';
        content: string;
    };
    
    let messages = $state<Message[]>([]);

    function sendMessage(content: string) {
        messages.push({
            id: Date.now(),
            role: 'user',
            content
        });
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