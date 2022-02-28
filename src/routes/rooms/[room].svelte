<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';

	let roomName, participants, user, ws, pictureInput;

	if (browser) {
		user = window.localStorage.getItem('user');
		if (user == undefined) {
			user = {
				uuid: crypto.randomUUID(),
				picture:
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKiSURBVFiF7ZbNTxNBGIef2a/Z7vaDYlpSMIaA8hE9yAE5KiQeMHgzRi/cTDyoB89y8k+QRBPixZPReMKTBxP8iPEjUWJEA0gkKEYLQoHWtrRdD4XGQgtbIOHSN5nsZua37++ZybwzK7y+sMM+hrKf5lWAKgCAtvNPBboVAGA1EQN2VkwVA2jSpqnnCg2dFzAD9QAkY7P8eHufqaeDZFJxV3kUVcM0bUQl54D013Hi8kO84daS4/Hf47y+c47U0q+yOYRQkKaNYZh5ELfmCEFH/1BZcwA73EJH/xAIUSoBUlp4fbUF84oAQm3dBBu7ttUFG7sItXUX9em6xOsLIk0bsQHONUC4/bRbaUGrqjq2twaP5UdR1JJa15vQrIm4BvAEG/BYfnRdbqt1vQKriQXXAE467sq8IoD5yZeuAWLf3rjWugb4+WGYvwvT2+pSi9+ZG3uy9wC5TIr39y6RSS6V1WRTy3x5dJ1cJr33AACxmVFe3TrD4tRzio9eh8WpF4zevcjK7FglKSs5CQVSejCkhRACwxfCCjUDkIh+Jb0crch4PVyVoa5L7Jo6DrSeInCoEyt8BBmIoJl+ADLJZVKxWRLRCWLT71iYeEYmueJuWlutgKrqBOqaaOy5RuhYH4pmlpMWRS6bIvpxmJmR21veC2UBFEVFmjaR42c53HcT1bBdGW+MbDrO5OMB5j6Vr4oiACEEhrSQ0kNty0nazw+C2OU/i5Pj84Or/BkfKTlcyG4YJl5fLVJaCKHS3Duwe3MAodDcewNR5i5QNM3A9gYxPT7EmqEVbsYIRECwu7Y+OX8EK9RUmq/+4NFNe0CoGronkK90x8k38k+H9Xf+66O4b+2zwlnhOOSyq+DkNgGULEMnmyG9Ml+SeK9j3/+KqwBVgH8M5bqfJOzlqQAAAABJRU5ErkJggg==',
				name: 'Anonymous'
			};
			window.localStorage.setItem('user', JSON.stringify(user));
		} else {
			user = JSON.parse(user);
		}

		ws = new WebSocket(
			`ws://localhost:5000/${$page.params.room}?client_id=${user.uuid}&name=${
				user.name
			}&picture=${encodeURIComponent(user.picture)}`
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

	const handleNameInput = () => {
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
	};

	const onPictureSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			user.picture = e.target.result;
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
		};
	};
</script>

<nav class="navbar">
	<div class="left">
		<h3>MobTimer</h3>
	</div>
	<div class="right flex">
		{#if user}
			<input on:change={handleNameInput} class="name-input" bind:value={user.name} />
			<div class="user-picture-container">
				<img
					on:click={() => {
						pictureInput.click();
					}}
					class="user-picture clickable"
					src={user.picture}
					alt="User profile"
				/>
			</div>
		{/if}
	</div>
</nav>

<div class="content">
	{#if roomName}
		<h1>{roomName}</h1>
	{/if}
	{#if participants}
		<ul>
			{#each Object.entries(participants) as [uuid, participant]}
				<li
					class="participant-container"
					in:fly={{ x: 1000, duration: 500 }}
					out:fly={{ x: -1000, duration: 500 }}
				>
					<div class="user-picture-container">
						<img class="user-picture" src={participant.picture} alt="Participant profile" />
					</div>
					<p class="participant-name">{participant.name}</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<input
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	on:change={(e) => onPictureSelected(e)}
	bind:this={pictureInput}
/>

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
		margin-right: 2em;
	}

	.user-picture-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user-picture {
		width: 32px;
		height: 32px;
		border: 2px solid black;
		border-radius: 50%;
	}

	.clickable {
		cursor: pointer;
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

	.participant-container {
		padding: 0 2em;
		border: 1px solid black;
		display: flex;
	}

	.participant-name {
		margin-left: 1em;
	}
</style>
