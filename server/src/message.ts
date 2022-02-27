import { Participant } from './participant.ts';
import { Room } from './room.ts';

interface WSMessage {
	message_type: string;
	content: object;
}

export class RoomConnectionMessage implements WSMessage {
	message_type: string;
	content: object;

	constructor(room: Room) {
		this.message_type = 'RoomConnection';
		this.content = room;
	}
}

export enum ParticipantUpdateType {
	ParticipantAdded = 'ParticipantAdded',
	ParticipantRemoved = 'ParticipantRemoved'
}

export class ParticipantUpdateMessage implements WSMessage {
	message_type: string;
	content: object;

	constructor(type: ParticipantUpdateType, participant: Participant) {
		this.message_type = type;
		this.content = participant;
	}
}
