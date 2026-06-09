<script>
    import MainContainer from '$lib/components/ChatWindow.svelte'

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

<MainContainer />