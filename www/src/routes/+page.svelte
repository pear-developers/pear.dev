<script lang="ts">
	let roomId: string = '';
</script>

<form action={`/${roomId}`}>
	<input bind:value={roomId} type="text" placeholder="Enter a room name" />
	<button type="submit">Go</button>
</form>
