<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { user } from '../../stores/user.store';

	let roomStatus: RoomStatus;
	let ws: WebSocket;
	if (browser) {
		ws = new WebSocket(`${import.meta.env.VITE_WS_URL}:${import.meta.env.VITE_WS_PORT}/wss`);

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					type: 'Auth',
					data: {
						uuid: $user.uuid,
						room: $page.params.room,
						name: $user.name,
						picture: $user.picture
					}
				})
			);

			ws.onmessage = (m: MessageEvent<string>) => {
				const message = JSON.parse(m.data);
				switch (message.type) {
					case 'RoomStatus':
						roomStatus = message.data;
						break;
					default:
						break;
				}
			};
		};

		onDestroy(() => {
			ws.close();
		});
	}
</script>

<h1>{$page.params.room}</h1>
{#if roomStatus}
	<ol>
		{#each roomStatus.users as user}
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
{/if}
