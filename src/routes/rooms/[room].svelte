<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';

	let roomName;
	let participants;
	let user;
	let ws;

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

		ws = new WebSocket(
			`ws://localhost:5000/${$page.params.room}?client_id=${user.uuid}&name=${user.name}`
		);

		ws.addEventListener('message', (message) => {
			let msg = JSON.parse(message.data);

			switch (msg.message_type) {
				case 'RoomConnection':
					roomName = msg.content.url.replace('/', '');
					participants = msg.content.participants;
					break;
				case 'ParticipantAdded':
					const add_uuid = msg.content.uuid;
					participants[add_uuid] = msg.content;
					break;
				case 'ParticipantRemoved':
					const rmv_uuid = msg.content.uuid;
					if (rmv_uuid in participants) {
						let newParticipants = participants;
						delete newParticipants[rmv_uuid];
						participants = newParticipants;
					}
					break;
				case 'ParticipantInfoUpdate':
					const upd_uuid = msg.content.uuid;
					if (upd_uuid in participants) {
						let updatedParticipants = participants;
						updatedParticipants[upd_uuid] = msg.content;
						participants = updatedParticipants;
					}
					break;
				default:
					console.log(msg);
			}
		});
	}

	function handleNameInput() {
		window.localStorage.setItem('user', JSON.stringify(user));
		let updatedParticipants = participants;
		updatedParticipants[user.uuid] = user;
		participants = updatedParticipants;
		if (ws) {
			ws.send(
				JSON.stringify({
					message_type: 'ParticipantInfoUpdate',
					content: user
				})
			);
		}
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
	<div class="right flex">
		{#if user}
			<input on:change={handleNameInput} class="name-input" bind:value={user.name} />
		{/if}
	</div>
</nav>

<div class="content">
	{#if roomName}
		<h1>{roomName}</h1>
	{/if}
	{#if participants}
		<ul>
			{#each Object.entries(participants) as [_, participant]}
				<li in:fly={{ x: 1000, duration: 500 }} out:fly={{ x: -1000, duration: 500 }}>
					<p>{participant.name}</p>
				</li>
			{/each}
		</ul>
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

	.flex {
		display: flex;
	}

	.name-input {
		font-family: 'Poppins', sans-serif;
		font-size: 1.17em;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background: none;
		text-align: end;
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
