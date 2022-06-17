<script>
	import Topbar from '$lib/Topbar.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<script src="https://kit.fontawesome.com/5df948da5c.js" crossorigin="anonymous"></script>
</svelte:head>

<Topbar />
<Sidebar />

<slot />

<style lang="scss" global>
	body {
		background-color: $body-background;
	}
</style>
