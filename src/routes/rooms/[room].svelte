<script>
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';

	let roomName, participants, user, ws;
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

		user = window.localStorage.getItem('user');
		if (user == undefined) {
			user = {
				uuid: crypto.randomUUID(),
				picture:
					'data:image/png;base64,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',
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
