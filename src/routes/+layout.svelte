<script>
	import { theme } from '../stores/theme';
	import Header from '$lib/Header.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/5df948da5c.js" crossorigin="anonymous"></script>
</svelte:head>

<div id="theme-container" class={$theme}>
	<div id="app-content" class="bg-gray-100 dark:bg-gray-800">
		<Header />
		<Sidebar />

		<slot />
	</div>
</div>
