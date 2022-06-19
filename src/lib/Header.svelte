<script lang="ts">
	import type { Theme } from '../types';
	import { setTheme, theme } from '../stores/theme';

	$: nextTheme = ($theme === 'dark' ? 'light' : 'dark') as Theme;
	const handleThemeButtonClick = () => {
		setTheme(nextTheme);
	};
</script>

<header class="p-6 pr-28 flex justify-between items-center">
	<a
		href="/"
		class="p-4 cursor-pointer rounded-2xl border border-transparent hover:border-gray-300 hover:bg-gray-200 hover:dark:border-gray-600 hover:dark:bg-gray-700"
	>
		<i class="fa-solid fa-house text-3xl text-gray-800 leading-none dark:text-gray-50" />
	</a>
	<button
		on:click={handleThemeButtonClick}
		class="p-4 cursor-pointer rounded-2xl border border-transparent hover:border-gray-300 hover:bg-gray-200 hover:dark:border-gray-600 hover:dark:bg-gray-700"
	>
		{#if $theme === 'dark'}
			<i class="fa-solid fa-sun text-3xl text-gray-800 leading-none dark:text-gray-50" />
		{:else}
			<i class="fa-solid fa-moon text-3xl text-gray-800 leading-none dark:text-gray-50" />
		{/if}
	</button>
</header>

<style lang="scss">
	button {
		i {
			transition: transform 0.3s;
		}
		&:hover {
			i {
				transform: rotate(30deg);
			}
		}
	}
</style>
