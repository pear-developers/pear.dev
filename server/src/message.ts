import { Participant } from './participant.ts';
import { Room } from './room.ts';
import { Timer } from './timer.ts';

export interface WSMessage {
	message_type: string;
	content: object;
}

export class RoomConnectionMessage implements WSMessage {
	message_type: string;
	content: Room;

	constructor(room: Room) {
		this.message_type = 'RoomConnection';
		this.content = room;
	}
}

export enum ParticipantUpdateType {
	ParticipantAdded = 'ParticipantAdded',
	ParticipantRemoved = 'ParticipantRemoved',
	ParticipantInfoUpdate = 'ParticipantInfoUpdate'
}

export class ParticipantUpdateMessage implements WSMessage {
	message_type: string;
	content: Participant;

	constructor(type: ParticipantUpdateType, participant: Participant) {
		this.message_type = type;
		this.content = participant;
	}
}

export enum TimerUpdateType {
	TimerStart = 'TimerStart',
	TimerStop = 'TimerStop'
}

export class TimerUpdateMessage implements WSMessage {
	message_type: string;
	content: Timer;

	constructor(timer: Timer) {
		this.message_type = 'TimerUpdate';
		this.content = timer;
	}
}
