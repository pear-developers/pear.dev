<script>
	import Topbar from '$lib/Topbar.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	let show_sidebar;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Topbar bind:show_sidebar />
<Sidebar bind:show={show_sidebar} />

<slot />

<style lang="scss" global>
	body {
		background-color: $body-background;
	}
</style>
