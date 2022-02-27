import { Participant } from './participant.ts';
import { ParticipantUpdateMessage, ParticipantUpdateType } from './message.ts';

export class Room {
	url: string;
	participants: { [uuid: string]: Participant } = {};

	constructor(url: string, creator: Participant) {
		this.url = url;
		this.participants[creator.uuid] = creator;
	}

	addParticipant(participant: Participant) {
		if (!(participant.uuid in this.participants)) {
			this.participants[participant.uuid] = participant;

			for (const key in this.participants) {
				if (key != participant.uuid) {
					this.participants[key].ws.send(
						JSON.stringify(
							new ParticipantUpdateMessage(ParticipantUpdateType.ParticipantAdded, participant)
						)
					);
				}
			}
		}
	}

	removeParticipant(uuid: string) {
		if (uuid in this.participants) {
			let participant = this.participants[uuid];
			delete this.participants[uuid];
			for (const key in this.participants) {
				this.participants[key].ws.send(
					JSON.stringify(
						new ParticipantUpdateMessage(ParticipantUpdateType.ParticipantRemoved, participant)
					)
				);
			}
		}
	}
}
