import { Participant } from './participant.ts';
import { Room } from './room.ts';

interface WSMessage {
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
	TimerStart = 'TimerStart'
}

export class TimerStartMessage implements WSMessage {
	message_type: string;
	content: object;

	constructor(timestamp: number) {
		this.message_type = TimerUpdateType.TimerStart;
		this.content = {};
		// this.content = timestamp;
	}
}
