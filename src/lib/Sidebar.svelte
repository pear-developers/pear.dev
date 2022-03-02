<script>
	import { fly } from 'svelte/transition';

	export let show = true;

	let width;
</script>

{#if show}
	<aside bind:clientWidth={width} transition:fly={{ x: width, duration: 500, opacity: 1 }}>
		<header>
			<button
				on:click={() => {
					show = false;
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
						d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
					/></svg
				>
			</button>
			<h1>SETTINGS</h1>
		</header>
		<section />
	</aside>
{/if}

<style>
	aside {
		position: fixed;
		overflow-y: auto;
		top: 0;
		right: 0;

		height: 100%;
		width: 20vw;
		border-left: 1px solid #cddde4;

		background: #fff;
	}

	header {
		padding: 2.5rem;
		border-bottom: 1px solid #bfbfbf;

		display: flex;
		align-items: center;
	}
	header h1 {
		margin: 0 auto;

		color: #3f3838;

		font-family: 'Josefin Sans', sans-serif;
		font-weight: 400;
		font-size: 32px;
		line-height: 0;
	}
	header button {
		border: none;
		padding: 0;

		background-color: transparent;

		cursor: pointer;
	}
	header button svg {
		height: 32px;

		fill: #3f3838;
	}
</style>
