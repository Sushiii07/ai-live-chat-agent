<script>
    import MainContainer from '$lib/components/ChatWindow.svelte'
    let numbers = $state([1, 2, 3, 4]);
    let sum = $derived(numbers.reduce((a, b) => a + b, 0));

    function addNumber() {
        numbers[numbers.length] = numbers.length + 1;
    }
</script>

<MainContainer />