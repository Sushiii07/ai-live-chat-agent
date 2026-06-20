<script lang="ts">
    let { message } = $props();
</script>

<div class="bubble {message.role}">
    {message.content}
</div>

<style>
    .bubble {
        max-width: 70%;
        max-height: 300px;
        padding: 12px;
        border-radius: 16px;
        margin-bottom: 8px;

        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-break: break-word;
        overflow-y: auto;
        overflow-x: hidden;

        scrollbar-width: thin;
        scrollbar-color: rgba(150,150,150,0.5) transparent;
    }

    .user {
        /* border: 3px #F1F5F9 solid; */
        color: #F1F5F9;
        margin-left: auto;
        background-color: #2B2F3A;
    }
    
    .assistant {
        /* border: 3px #FFB703 solid; */
        color: #F1F5F9;
        margin-right: auto;
    }
</style>