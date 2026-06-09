<script>
    let { message } = $props();
</script>

<div class="bubble {message.role}">
    {message.content}
</div>

<style>
    .bubble {
        max-width: 70%;
        padding: 12px;
        border-radius: 16px;
        margin-bottom: 8px;
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