import { Message } from "./message.ts";
import { Room } from "./room.ts";
import { User } from "./user.ts";

export class ClientManager {
  rooms: { [key: string]: Room } = {};

  addClient(ws: WebSocket) {
    ws.onopen = () => {
      ws.onmessage = (msg: MessageEvent<string>) => {
        const message: Message = JSON.parse(msg.data);
        const { uuid, name, picture, room_id } = message.data;
        const user = new User(uuid, name, picture, ws);

        if (room_id in this.rooms) this.rooms[room_id].addUser(user);
        else this.rooms[room_id] = new Room(user);

        ws.onclose = () => {
          const size = this.rooms[room_id].removeUser(user);
          if (size == 0) delete this.rooms[room_id];
        };
      };
    };
  }
}
