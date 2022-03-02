export enum TimerState {
	Running = 'Running',
	Stopped = 'Stopped'
}

export class Timer {
	duration: number;
	remaining: number;
	lastStartTime: number;
	state: TimerState;

	constructor(duration: number) {
		this.duration = duration;
		this.remaining = duration;
		this.lastStartTime = -1;
		this.state = TimerState.Stopped;
	}

	start(timestamp: number) {
		this.lastStartTime = timestamp;
		this.state = TimerState.Running;
	}

	stop(timestamp: number) {
		const delta = timestamp - this.lastStartTime;
		this.remaining -= delta;
		if (this.remaining <= 0) this.remaining = this.duration;
		this.state = TimerState.Stopped;
	}

	toJSON() {
		return {
			remaining: this.remaining,
			state: this.state,
			lastStartTime: this.lastStartTime,
			duration: this.duration
		};
	}
}
