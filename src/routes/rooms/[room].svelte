<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	let messages = [];
	let user;

	if (browser) {
		user = window.localStorage.getItem('user');
		if (user == undefined) {
			user = {
				uuid: crypto.randomUUID(),
				picture: '',
				name: 'Anonymous'
			};
			window.localStorage.setItem('user', JSON.stringify(user));
		} else {
			user = JSON.parse(user);
		}

		const ws = new WebSocket(
			`ws://localhost:5000/${$page.params.room}?client_id=${user.uuid}&name=${user.name}`
		);

		ws.addEventListener('message', (message) => {
			let msg = JSON.parse(message.data);
			console.log(msg);
			messages = [...[msg]];
		});
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
</svelte:head>

<nav class="navbar">
	<div class="left">
		<h3>MobTimer</h3>
	</div>
	<div class="right">
		{#if user}
			<h3>{user.name}</h3>
		{/if}
	</div>
</nav>

<div class="content">
	{#if messages.length > 0}
		<h1>{messages[0].url.replace('/', '')}</h1>
		<ul>
			{#each Object.entries(messages[messages.length - 1].participants) as [uuid, participant]}
				<li>
					<p>{participant.name}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Nothing to show</p>
	{/if}
</div>

<style>
	.navbar {
		font-family: 'Poppins', sans-serif;
		padding: 0 2em;
		display: flex;
		justify-content: flex-end;
		border-bottom: 1px solid black;
	}

	.left {
		margin-right: auto;
	}

	.content {
		font-family: 'Poppins', sans-serif;
		display: flex;
		flex-direction: column;
		padding: 0 4em;
	}

	.content ul {
		list-style-type: none;
	}

	.content ul li {
		padding: 0 2em;
		border: 1px solid black;
	}
</style>
