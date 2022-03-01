enum TimerState {
	Running = 'Running',
	Stopped = 'Stopped'
}

export class Timer {
	duration: number;
	remaining: number;
	last_start_time: number;
	state: TimerState;

	constructor(duration: number) {
		this.duration = duration;
		this.remaining = duration;
		this.last_start_time = -1;
		this.state = TimerState.Stopped;
	}

	start(timestamp: number) {
		this.last_start_time = timestamp;
		this.state = TimerState.Running;
	}

	stop(timestamp: number) {
		const delta = timestamp - this.last_start_time;
		this.remaining -= delta;
		this.state = TimerState.Stopped;
	}

	restart(timestamp: number) {
		this.remaining = this.duration;
		this.start(timestamp);
	}

	toJSON() {
		return {
			remaining: this.remaining
		};
	}
}
