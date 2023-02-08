import { Participant } from "./participant.ts";
import {
  ParticipantUpdateMessage,
  ParticipantUpdateType,
  RoomConnectionMessage,
  TimerUpdateMessage,
  TimerUpdateType,
  WSMessage,
} from "./message.ts";
import { Timer } from "./timer.ts";

export class Room {
  url: string;
  participants: { [uuid: string]: Participant } = {};
  timer: Timer;

  constructor(url: string, creator: Participant) {
    this.url = url;
    this.timer = new Timer(5_999);
    this.addParticipant(creator);
  }

  addParticipant(participant: Participant) {
    if (!(participant.uuid in this.participants)) {
      this.participants[participant.uuid] = participant;
      participant.ws.send(JSON.stringify(new RoomConnectionMessage(this)));

      this.broadcast(
        new ParticipantUpdateMessage(
          ParticipantUpdateType.ParticipantAdded,
          participant,
        ),
        false,
        participant.uuid,
      );
      this.bindParticipantWS(participant.ws);
    }
  }

  removeParticipant(uuid: string): boolean {
    if (uuid in this.participants) {
      const participant = this.participants[uuid];
      delete this.participants[uuid];
      this.broadcast(
        new ParticipantUpdateMessage(
          ParticipantUpdateType.ParticipantRemoved,
          participant,
        ),
        false,
        uuid,
      );
    }
    return Object.keys(this.participants).length === 0;
  }

  bindParticipantWS(ws: WebSocket) {
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg);
      switch (data.message_type) {
        case ParticipantUpdateType.ParticipantInfoUpdate:
          this.broadcast(
            new ParticipantUpdateMessage(
              ParticipantUpdateType.ParticipantInfoUpdate,
              data.content,
            ),
            true,
            data.content.uuid,
          );
          this.participants[data.content.uuid].updateInfo(
            data.content.name,
            data.content.picture,
          );
          break;
        case TimerUpdateType.TimerStart:
          this.timer.start(parseInt(data.content.timestamp));
          this.broadcast(new TimerUpdateMessage(this.timer), true);
          break;
        case TimerUpdateType.TimerStop:
          this.timer.stop(parseInt(data.content.timestamp));
          this.broadcast(new TimerUpdateMessage(this.timer), true);
          break;
        default:
          return;
      }
    };
  }

  broadcast(message: WSMessage, toSelf: boolean, uuid?: string) {
    for (const key in this.participants) {
      if (toSelf || (!toSelf && key != uuid)) {
        this.participants[key].ws.send(JSON.stringify(message));
      }
    }
  }

  toJSON() {
    return {
      url: this.url,
      participants: this.participants,
      timer: this.timer,
    };
  }
}
