<script lang="ts">
	let room: string = '';
	let createRoom;
</script>

<main>
	<header>
		<figure>
			<img src="/pear-clock.gif" alt="Ticking clock shaped like a pear." />
		</figure>
		<div>
			<h1 class="overflow-hidden m-0 w-auto text-6xl font-semibold text-gray-800 dark:text-gray-50">
				PEAR.DEV
			</h1>
			<div class="input">
				<input
					class="p-4 pr-40 rounded-2xl w-full font-medium text-2xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-50"
					type="text"
					placeholder="mob name"
					bind:value={room}
					on:change={() => {
						createRoom.click();
					}}
				/><a disabled={room == ''} bind:this={createRoom} href="/{room}">CREATE</a>
			</div>
		</div>
	</header>
</main>

<style lang="scss">
	header {
		@apply flex justify-center items-center mt-40 w-[100vw];

		a {
			font-family: 'Poppins', sans-serif;
			text-decoration: none;

			@apply absolute right-2 w-32 p-2 text-center rounded-xl bg-green-400 text-green-600 font-semibold text-2xl cursor-pointer;

			&[disabled='true'] {
				@apply cursor-not-allowed;
			}
		}
	}

	h1 {
		font-family: 'Josefin Sans', sans-serif;
	}

	figure {
		@apply mr-8;
	}
	img {
		@apply w-[8vw];
	}
	input {
		font-family: 'Poppins', sans-serif;

		&:focus {
			@apply outline-none;
		}
		&::placeholder {
			@apply text-gray-400;
		}
	}

	.input {
		@apply flex items-center relative mt-2 w-96;
	}
</style>
