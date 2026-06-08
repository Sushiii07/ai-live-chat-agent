<script>
    import MessageBubble from "./MessageBubble.svelte";

    let { messages } = $props();
</script>

<div class="message-list">
    {#each messages as message (message.id)}
        <MessageBubble {message} />
    {/each}
</div>

<style>
    .message-list {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        overflow-y: auto;
    }
</style>