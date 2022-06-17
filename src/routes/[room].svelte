<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';
	import user from '../stores/user';
	import roomName from '../stores/roomName';

	let participants, ws;
	let timerStatus = {
		remaining: 0,
		state: 'Stopped',
		lastStartTime: 0,
		duration: 0
	};
	let localRemaining = 0;
	let localInterval = null;
	let notficiationEnabled = 'default';

	if (browser) {
		Notification.requestPermission().then((permission) => {
			notficiationEnabled = permission;
		});

		ws = new WebSocket(
			`ws://localhost:5000/${$page.params.room}?client_id=${$user.uuid}
			&name=${$user.name}&picture=${encodeURIComponent($user.picture)}`
		);

		ws.addEventListener('message', (message) => {
			let msg = JSON.parse(message.data);
			switch (msg.message_type) {
				case 'RoomConnection':
					$roomName = msg.content.url.replace('/', '');
					participants = msg.content.participants;
					handleTimerUpdate(msg.content.timer);
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
				case 'TimerUpdate':
					handleTimerUpdate(msg.content);
					break;
				default:
					console.log(msg);
			}
		});
	}

	$: if (ws !== null && ws !== undefined && ws.readyState === ws.OPEN) {
		ws.send(
			JSON.stringify({
				message_type: 'ParticipantInfoUpdate',
				content: $user
			})
		);
	}

	const toIntegerWithPrependZero = (n) => {
		return n.toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false
		});
	};

	const formatTime = (time) => {
		const t = time / 1000;
		const s = Math.floor((t % 60) / 1);
		const m = Math.floor(t / 60);
		return `${toIntegerWithPrependZero(m)}:${toIntegerWithPrependZero(s)}`;
	};

	const handleTriggerTimer = () => {
		if (ws) {
			ws.send(
				JSON.stringify({
					message_type: timerStatus.state == 'Stopped' ? 'TimerStart' : 'TimerStop',
					content: {
						timestamp: new Date().getTime()
					}
				})
			);
		}
	};

	const handleTimerUpdate = (newTimerStatus) => {
		const currentStatus = timerStatus.state;
		const newStatus = newTimerStatus.state;
		timerStatus = newTimerStatus;
		if (currentStatus == 'Stopped' && newStatus == 'Running') {
			if (localInterval) clearInterval(localInterval);
			localRemaining = timerStatus.remaining;
			localInterval = setInterval(() => {
				let delta = new Date().getTime() - newTimerStatus.lastStartTime;
				timerStatus.remaining = localRemaining - delta;
				if (timerStatus.remaining <= 0) {
					timerStatus.state = 'Running';
					timerStatus.remaining = 0;
					handleTriggerTimer();
					playJingle();
					showNotification();
					if (localInterval) clearInterval(localInterval);
				}
			}, 200);
		} else if (currentStatus == 'Running' && newStatus == 'Stopped') {
			if (localInterval) clearInterval(localInterval);
		}
	};

	const playJingle = () => {
		const jingle = document.getElementById('jingle-audio');
		jingle.play();
	};

	const showNotification = () => {
		if (notficiationEnabled == 'granted') {
			const notification = new Notification("Time's up!", {
				body: 'Next dev! Click this notification to restart timer',
				image: '/type-logo.png',
				icon: '/type-logo.png'
			});
			notification.addEventListener('click', function () {
				handleTriggerTimer();
				notification.close();
			});
			setTimeout(() => notification.close(), 5_000);
		}
	};
</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<section>
	<div class="timer">
		<h2>{formatTime(timerStatus.remaining)}</h2>
		<div class="control-buttons">
			<button on:click={handleTriggerTimer}>
				{#if timerStatus.state == 'Stopped'}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
							d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"
						/></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
						><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
							d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"
						/></svg
					>
				{/if}
			</button>
			<button disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
					><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.86 0-95.19-15.58-134.2-44.86c-14.14-10.59-17-30.66-6.391-44.81c10.61-14.09 30.69-16.97 44.8-6.375c27.84 20.91 61 31.94 95.89 31.94C344.3 415.8 416 344.1 416 256s-71.67-159.8-159.8-159.8C205.9 96.22 158.6 120.3 128.6 160H192c17.67 0 32 14.31 32 32S209.7 224 192 224H48c-17.67 0-32-14.31-32-32V48c0-17.69 14.33-32 32-32s32 14.31 32 32v70.23C122.1 64.58 186.1 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"
					/></svg
				>
			</button>
			<button disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
					><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z"
					/></svg
				>
			</button>
		</div>
	</div>
</section>

<div class="content">
	<div class="participants-container">
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
</div>

<audio id="jingle-audio">
	<source src="/jingle.mp3" type="audio/mpeg" />
</audio>

<style lang="scss">
	section {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.timer h2 {
		margin-bottom: 1rem;

		font-family: 'Josefin Sans', sans-serif;
		font-size: 64px;
		font-weight: 600;

		color: $dark-text;
	}

	.control-buttons {
		display: flex;
		justify-content: center;

		button {
			display: inline-flex;
			justify-content: center;
			align-items: center;

			width: 45px;
			height: 45px;
			border: none;
			border-radius: 5px;

			margin-right: 0.5rem;
			padding: 0.8rem;

			background-color: $primary-background;

			cursor: pointer;

			svg {
				fill: $primary-text;
			}

			&:disabled {
				cursor: not-allowed;
			}
		}
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

	.content {
		font-family: 'Poppins', sans-serif;
		display: flex;
		flex-direction: column;
		padding: 0 4em;

		ul {
			list-style-type: none;
		}
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
