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

<style>
	:root {
		background-color: #f6fcff;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10rem;
		width: 100vw;
	}
	h1 {
		overflow: hidden;
		margin: 0;
		width: auto;

		color: #3f3838;

		font-family: 'Josefin Sans', sans-serif;
		font-size: 64px;
		font-weight: 600;
	}
	p {
		margin-top: 0;

		color: #898989;

		font-family: 'Poppins', sans-serif;
		font-size: 32px;
		font-weight: 600;
	}

	img {
		width: 8vw;
	}

	a,
	input {
		padding: 0.7rem 1rem;
		border-radius: 10px;
	}
	input {
		border-radius: 10px;
		border: 1px solid #83cc69;
		width: 20vw;

		background-color: #ecfde6;

		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 24px;
	}
	input:focus {
		outline: none;
	}
	input::placeholder {
		color: #9dcf8a;
	}

	a {
		display: inline-block;
		border-radius: 10px;
		border: 1px solid #83cc69;

		background-color: #83cc69;
		color: #57a83b;

		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-size: 24px;
		text-decoration: none;
		cursor: pointer;
	}

	.input-group {
		margin-top: 10px;
		padding: 0.3rem;
		border-radius: 15px;
		border: 2px solid #83cc69;
	}
	.input-group :nth-child(1) {
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
	.input-group :nth-child(2) {
		border-top-left-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
	}
</style>
