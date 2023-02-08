<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	let users = [];

	const uuid = Math.random().toString();
	const name = Math.random().toString();
	let ws: WebSocket;
	if (browser) {
		ws = new WebSocket(`${import.meta.env.VITE_WS_URL}:${import.meta.env.VITE_WS_PORT}/wss`);
		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					type: 'Auth',
					data: {
						uuid,
						room: $page.params.room,
						name,
						picture: null
					}
				})
			);
			users = [...users, { uuid, name, picture: null }];
		};

		ws.onmessage = (m: MessageEvent<string>) => {
			const message = JSON.parse(m.data);
			switch (message.type) {
				case 'NewUser':
					if (message.data.uuid != uuid) users = [...users, message.data];
					break;
				case 'RoomStatus':
					users = [...users, ...message.data.users];
					break;
				default:
					break;
			}
		};
	}

	onDestroy(() => {
		if (ws) ws.close();
	});
</script>

<main>
	<ol>
		{#each users as user}
			<li>
				<p>NAME: {user.name}</p>
				<p>UUID: {user.uuid}</p>
				{#if !user.picture}
					<img
						alt={`${user.name} profile picture`}
						src="https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
					/>
				{/if}
			</li>
		{/each}
	</ol>
</main>

<style>
	ol {
		display: flex;
		gap: 2em;
		align-items: center;
		justify-content: center;
	}

	ol li {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	ol img {
		width: 5em;
		aspect-ratio: 1;
		border-radius: 50%;
	}
</style>
