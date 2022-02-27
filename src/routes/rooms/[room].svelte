<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	let messages = [];

	if (browser) {
		let uuid = window.localStorage.getItem('userUUID');
		if (uuid == undefined) {
			uuid = crypto.randomUUID();
			window.localStorage.setItem('userUUID', uuid);
		}

		const ws = new WebSocket(`ws://localhost:5000/${$page.params.room}?client_id=${uuid}`);

		ws.addEventListener('message', (message) => {
			let msg = JSON.parse(message.data);
			console.log(msg);
			messages = [...[msg]];
		});
	}
</script>

{#if messages.length > 0}
	<h1>{messages[0].url.replace('/', '')}</h1>
	<ul>
		{#each Object.entries(messages[messages.length - 1].participants) as [uuid, participant]}
			<li>
				<p>{uuid}</p>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nothing to show</p>
{/if}
