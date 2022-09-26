<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import user from '../../stores/user.ts';
	import roomName from '../../stores/roomName.ts';
	import { onDestroy } from 'svelte';

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

		onDestroy(() => {
			ws.close();
		});

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
		} else if (currentStatus === 'Running' && newStatus == 'Stopped') {
			if (localInterval) clearInterval(localInterval);
		}
	};

	const playJingle = () => {
		const jingle = document.getElementById('jingle-audio');
		jingle.play();
	};

	const showNotification = () => {
		if (notficiationEnabled === 'granted') {
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
<section class="w-full flex justify-center">
	<div class="flex flex-col justify-center items-center">
		<h2 class="mb-4 text-gray-800 dark:text-gray-50 text-6xl font-bold">
			{formatTime(timerStatus.remaining)}
		</h2>
		<div class="control-buttons">
			<button
				on:click={handleTriggerTimer}
				class="flex justify-center items-center bg-gray-200 dark:bg-gray-700 py-4 px-5 rounded-2xl border border-gray-300 dark:border-gray-600"
			>
				{#if timerStatus.state == 'Stopped'}
					<i class="fa-solid fa-play text-3xl text-gray-800 leading-none dark:text-gray-50" />
				{:else}
					<i class="fa-solid fa-pause text-3xl text-gray-800 leading-none dark:text-gray-50" />
				{/if}
			</button>
		</div>
	</div>
</section>

<section class="flex justify-center items-center mt-16">
	{#if participants}
		{#each Object.entries(participants) as [uuid, participant]}
			<div class="flex flex-col justify-center items-center m-4">
				<img
					class="w-24 h-24 rounded-2xl mb-2"
					src={participant.picture}
					alt="Participant profile"
				/>
				{#if participant.role !== 'passenger'}
					<span
						class="bg-gray-300 dark:bg-gray-600 text-xl text-gray-800 dark:text-gray-50 py-[0.15rem] px-2 rounded-full mt-[-1.5rem]"
						>{participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}</span
					>
				{/if}
				<p class="text-gray-800 dark:text-gray-50 text-xl font-normal">{participant.name}</p>
			</div>
		{/each}
	{/if}
</section>

<audio id="jingle-audio">
	<source src='/jingle.mp3' type="audio/mpeg" />
</audio>
