import { Participant } from './participant.ts';
import { ParticipantUpdateMessage, ParticipantUpdateType } from './message.ts';
import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';

export class Room {
	url: string;
	participants: { [uuid: string]: Participant } = {};

	constructor(url: string, creator: Participant) {
		this.url = url;
		this.addParticipant(creator);
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

			this.bindParticipantWS(participant.ws);
		}
	}

	removeParticipant(uuid: string): boolean {
		if (uuid in this.participants) {
			const participant = this.participants[uuid];
			delete this.participants[uuid];
			for (const key in this.participants) {
				if (key != uuid) {
					this.participants[key].ws.send(
						JSON.stringify(
							new ParticipantUpdateMessage(ParticipantUpdateType.ParticipantRemoved, participant)
						)
					);
				}
			}
		}
		return Object.keys(this.participants).length === 0;
	}

	bindParticipantWS(ws: WebSocketClient) {
		ws.on('message', (msg) => {
			const data = JSON.parse(msg);
			switch (data.message_type) {
				case ParticipantUpdateType.ParticipantInfoUpdate:
					for (const key in this.participants) {
						if (key != data.content.uuid) {
							this.participants[key].ws.send(
								JSON.stringify(
									new ParticipantUpdateMessage(
										ParticipantUpdateType.ParticipantInfoUpdate,
										data.content
									)
								)
							);
						}
					}
					this.participants[data.content.uuid].updateInfo(data.content.name);
					break;
				default:
					return;
			}
		});
	}
}
