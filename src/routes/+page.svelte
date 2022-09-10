<script lang="ts">
	let room: string = '';
	let createRoom;

	function handleKeyup(event) {
		if (event.key === 'Enter') {
			createRoom.click();
		}
	}
</script>

<main class="flex flex-col items-center mt-28">
	<div class="flex items-center relative w-96">
		<input
			class="focus:outline-none placeholder:text-gray-400 p-4 pr-40 rounded-2xl w-full font-medium text-2xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-50"
			type="text"
			placeholder="Enter room name"
			bind:value={room}
			on:keyup={handleKeyup}
		/>
		<a
			class="absolute right-2 w-32 p-2 text-center rounded-xl bg-green-400 text-green-600 font-semibold text-2xl cursor-pointer"
			disabled={room == ''}
			bind:this={createRoom}
			href="/{room}"
		>
			Create
		</a>
	</div>
</main>

<style>
	a[disabled='true'] {
		cursor: not-allowed;
	}
</style>
