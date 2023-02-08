import { Participant, Role } from "./participant.ts";
import { Room } from "./room.ts";

export class Server {
  rooms: { [key: string]: Room } = {};

  constructor() {
    // this.wss = new WebSocketServer(port);
    // this.wss.on(
    //   "connection",
    //   (ws: WebSocketClient, request: string) => this.onConnection(ws, request),
    // );
  }

  onConnection(ws, request: string) {
    if (request.split("?").length != 2) return;

    const roomUrl = request.split("?")[0];
    const params = new URLSearchParams(request.split("?")[1]);
    const client_uuid = params.get("client_id");
    const name = params.get("name");
    const picture = params.get("picture");
    const participantCount = roomUrl in this.rooms
      ? Object.keys(this.rooms[roomUrl].participants).length
      : null;
    const role = participantCount == null
      ? Role.Driver
      : participantCount == 1
      ? Role.Navigator
      : Role.Passenger;

    if (client_uuid && name && picture) {
      const participant = new Participant(client_uuid, name, picture, role, ws);

      if (roomUrl in this.rooms) {
        this.rooms[roomUrl].addParticipant(participant);
      } else this.rooms[roomUrl] = new Room(roomUrl, participant);
    }

    ws.onclose = () => {
      if (roomUrl in this.rooms && client_uuid) {
        const shouldRemove = this.rooms[roomUrl].removeParticipant(client_uuid);
        if (shouldRemove) delete this.rooms[roomUrl];
      }
    };
  }
}
