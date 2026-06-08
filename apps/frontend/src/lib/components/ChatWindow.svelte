<script>
    import MessageList from "$lib/components/MessageList.svelte";

    let messages = [
        {
            id: 1,
            role: "user",
            content: "Hello"
        },
        {
            id: 2,
            role: "assistant",
            content: "Hi! How can I help you?"
        }
    ];
</script>

<div class="wrapper">
    <div class="container">
        <h1>Chat Window</h1>
        <MessageList {messages} />
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
        background-color: #141826;
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>