<script lang="ts">
    let text = $state('');
    let textarea: HTMLTextAreaElement | null = null;


    let { onSend } = $props();

    function handleSubmit() {
        const message = text.trim();

        if(!message) return;

        onSend(message);
        text = ''

        resetHeight();
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    function autoResize() {
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    function resetHeight() {
        if (!textarea) return;

        textarea.style.height = "40px";
    }
</script>

<form onsubmit={(e) => {
    e.preventDefault();
    handleSubmit();
}}>
    <textarea
        bind:this={textarea}
        bind:value={text}
        placeholder="Type a message..."
        rows="1"
        oninput={autoResize}
        onkeydown={handleKeydown}
    ></textarea>

    <button 
        type="submit"
        disabled={!text.trim()}
    >
        Send
    </button>
</form>

<style>
    form {
        display: flex;
        gap: 10px;
        width: 100%;
    }

    textarea {
        flex: 0.9;
        padding: 10px;
        border-radius: 10px;

        resize: none;
        min-height: 40px;
        max-height: 150px;
        overflow-y: auto;

        white-space: pre-wrap;
        word-break: break-word;
    }

    button {
        flex: 0.1;
        border-radius: 10px;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>