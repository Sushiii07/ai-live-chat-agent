<script lang="ts">
    let text = $state('');

    let { onSend } = $props();

    function handleSubmit() {
        const message = text.trim();

        if(!message) return;

        onSend(message);
        text = ''
    }
</script>

<form onsubmit={(e) => {
    e.preventDefault();
    handleSubmit();
}}>
    <input
        bind:value={text}
        type="text"
        placeholder="Type a message..."
    />

    <button type="submit">
        Send
    </button>
</form>