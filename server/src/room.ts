import { Participant } from './participant.ts';

export class Room {
	url: string;
	participants: { [uuid: string]: Participant } = {};

	constructor(url: string, creator: Participant) {
		this.url = url;
		this.participants[creator.uuid] = creator;
	}

	addParticipant(participant: Participant) {
		if (!(participant.uuid in this.participants)) this.participants[participant.uuid] = participant;
	}
}
