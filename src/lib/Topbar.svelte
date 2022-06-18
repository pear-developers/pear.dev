<script lang="ts">
	import type { Theme } from '../types';
	import { setTheme, theme } from '../stores/theme';

	$: nextTheme = ($theme === 'dark' ? 'light' : 'dark') as Theme;
	const handleThemeButtonClick = () => {
		setTheme(nextTheme);
	};
</script>

<header>
	<a href="/" class="brand">
		<img src="/type-logo.svg" alt="Pear logo with pear.dev text." />
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
	header {
		padding: 1.5rem;
		padding-right: 7rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand img {
		height: 64px;
	}

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
