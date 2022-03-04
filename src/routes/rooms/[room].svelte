<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';
	import user from '../../stores/user';

	let roomName, participants, ws;
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
					roomName = msg.content.url.replace('/', '');
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



	$: if(ws !== null && ws !== undefined && ws.readyState === ws.OPEN) {
		ws.send(JSON.stringify({
			message_type: 'ParticipantInfoUpdate',
			content: $user
		}));
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
<div class="content">
	<div class="room-header-container">
		{#if roomName}
			<h1>{roomName}</h1>
		{/if}
	</div>
	<div class="timer-container">
		<h2>{formatTime(timerStatus.remaining)}</h2>
		<button on:click={handleTriggerTimer}
			>{timerStatus.state == 'Stopped' ? 'Start' : 'Stop'}</button
		>
	</div>
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

	.timer-container {
		padding: 0 1em;
		display: flex;
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
