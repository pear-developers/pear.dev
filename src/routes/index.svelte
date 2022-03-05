<script>
	let room = '';
	let createRoom;
</script>

<svelte:head>
	<title>Pear.dev • Pair programming tool.</title>
</svelte:head>

<main>
	<header>
		<figure>
			<img src="/pear-clock.gif" alt="Ticking clock shaped like a pear." />
		</figure>
		<h1>PEAR.DEV</h1>
		<p>Timing is everything!</p>
		<div class="input-group">
			<input
				type="text"
				placeholder="Enter room name"
				bind:value={room}
				on:change={() => {
					createRoom.click();
				}}
			/><a bind:this={createRoom} href="/rooms/{room}">GO</a>
		</div>
	</header>
</main>
<footer>
	<a href="https://github.com/zoford/pear.dev" target="_blank">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
			><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
				d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
			/></svg
		>
	</a>
</footer>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10rem;
		width: 100vw;

		a {
			display: inline-block;

			background-color: $primary-text;
			color: $primary-dark-text;

			font-family: 'Poppins', sans-serif;
			font-weight: 600;
			font-size: 24px;
			text-decoration: none;
			cursor: pointer;
		}
	}
	h1 {
		overflow: hidden;
		margin: 0;
		width: auto;

		color: $dark-text;

		font-family: 'Josefin Sans', sans-serif;
		font-size: 64px;
		font-weight: 600;
	}
	p {
		margin-top: 0;

		color: $secondary-text;

		font-family: 'Poppins', sans-serif;
		font-size: 32px;
		font-weight: 600;
	}

	img {
		width: 8vw;
	}

	footer {
		position: fixed;
		bottom: 0;

		display: flex;
		justify-content: center;
		padding-bottom: 20px;
		width: 100vw;

		text-align: center;

		svg {
			width: 32px;
			fill: $secondary-text;
		}
	}

	header a,
	input {
		padding: 0.7rem 1rem;
	}
	input {
		border: none;
		border-radius: 3px;
		width: 20vw;

		background-color: $light-background;

		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 24px;
		
		&:focus {
			outline: none;
		}
		&::placeholder {
			color: $placeholder-text;
		}
	}

	.input-group {
		margin-top: 10px;
		border: 3px solid $primary-text;
		border-radius: 5px;

		background-color: $primary-text;
		
		:nth-child(2) {
			border-top-left-radius: 0 !important;
			border-bottom-left-radius: 0 !important;
		}
	}
</style>
