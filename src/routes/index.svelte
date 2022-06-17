<script lang="ts">
	let room : string = '';
	let createRoom;
</script>

<main>
	<header>
		<figure>
			<img src="/pear-clock.gif" alt="Ticking clock shaped like a pear." />
		</figure>
		<div>
			<h1>PEAR.DEV</h1>
			<div class="input">
				<input
					type="text"
					placeholder="mob name"
					bind:value={room}
					on:change={() => {
						createRoom.click();
					}}
				/><a disabled={room == ""} bind:this={createRoom} href="/{room}">CREATE</a>
			</div>
		</div>
	</header>
</main>

<style lang="scss">
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10rem;
		width: 100vw;

		a {
			position: absolute;
			right: 0.5rem;
			width: 8rem;
			padding: 0.5rem;
			text-align: center;
			border: 1px solid $primary-dark-text;
			border-radius: 0.7rem;

			background-color: $primary-text;
			color: $primary-dark-text;
				
			font-family: 'Poppins', sans-serif;
			font-weight: 600;
			font-size: 24px;
			text-decoration: none;
			cursor: pointer;			

			&[disabled="true"] {
				cursor: not-allowed;

				&:active {
					pointer-events: none;
				}
			}
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

	figure {
		margin-right: 2rem;
	}
	img {
		width: 8vw;
	}
	input {
		padding: 1rem;
		padding-right: 10rem;
		border: 1px solid $border-light;
		border-radius: 1rem;
		width: 100%;

		background-color: #f5f5f5;

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

	.input {
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 10px;
		width: 23rem;
	}
</style>
