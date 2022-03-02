import { Participant } from './participant.ts';
import {
	ParticipantUpdateMessage,
	ParticipantUpdateType,
	TimerUpdateMessage,
	TimerUpdateType,
	WSMessage
} from './message.ts';
import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';
import { Timer } from './timer.ts';

export class Room {
	url: string;
	participants: { [uuid: string]: Participant } = {};
	timer: Timer;

	constructor(url: string, creator: Participant) {
		this.url = url;
		this.addParticipant(creator);
		this.timer = new Timer(5_999);
	}

	addParticipant(participant: Participant) {
		if (!(participant.uuid in this.participants)) {
			this.participants[participant.uuid] = participant;

			this.broadcast(
				new ParticipantUpdateMessage(ParticipantUpdateType.ParticipantAdded, participant),
				false,
				participant.uuid
			);
			this.bindParticipantWS(participant.ws);
		}
	}

	removeParticipant(uuid: string): boolean {
		if (uuid in this.participants) {
			const participant = this.participants[uuid];
			delete this.participants[uuid];
			this.broadcast(
				new ParticipantUpdateMessage(ParticipantUpdateType.ParticipantRemoved, participant),
				false,
				uuid
			);
		}
		return Object.keys(this.participants).length === 0;
	}

	bindParticipantWS(ws: WebSocketClient) {
		ws.on('message', (msg) => {
			const data = JSON.parse(msg);
			switch (data.message_type) {
				case ParticipantUpdateType.ParticipantInfoUpdate:
					this.broadcast(
						new ParticipantUpdateMessage(ParticipantUpdateType.ParticipantInfoUpdate, data.content),
						false,
						data.content.uuid
					);
					this.participants[data.content.uuid].updateInfo(data.content.name, data.content.picture);
					break;
				case TimerUpdateType.TimerStart:
					this.timer.start(data.content.timestamp);
					this.broadcast(new TimerUpdateMessage(this.timer), true);
					break;
				case TimerUpdateType.TimerStop:
					this.timer.stop(data.content.timestamp);
					this.broadcast(new TimerUpdateMessage(this.timer), true);
					break;
				default:
					return;
			}
		});
	}

	broadcast(message: WSMessage, toSelf: boolean, uuid?: string) {
		for (const key in this.participants) {
			if (toSelf || (!toSelf && key != uuid)) {
				this.participants[key].ws.send(JSON.stringify(message));
			}
		}
	}
}
