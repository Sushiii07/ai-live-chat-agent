<script lang="ts">
	import { onMount } from 'svelte';
	import { getSessionId } from '$lib/session';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css'

	let { children } = $props();

	onMount(() => {
		const sessionId = getSessionId();
		console.log('Session ID:', sessionId);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
