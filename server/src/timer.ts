export class Timer {
	duration: number;
	remaining: number;
	last_start_time: number;

	constructor(duration: number) {
		this.duration = duration;
		this.remaining = duration;
		this.last_start_time = -1;
	}

	start(timestamp: number) {
		this.last_start_time = timestamp;
	}

	stop(timestamp: number) {
		const delta = timestamp - this.last_start_time;
		this.remaining -= delta;
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
