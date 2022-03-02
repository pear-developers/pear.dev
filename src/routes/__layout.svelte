<script>
	import TopBar from '$lib/Topbar.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Poppins:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<TopBar />

<slot />

<style>
	:root {
		background-color: #f6fcff;
	}
</style>
