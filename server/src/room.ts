import { MessageType } from "./message.ts";
import { User } from "./user.ts";

export class Room {
  users: User[] = [];

  constructor(user: User) {
    this.users.push(user);
  }

  addUser(user: User) {
    this.users.forEach((u) => this.sendMessage(u.ws, "NewUser", user.toDto()));

    this.sendMessage(user.ws, "RoomStatus", {
      users: this.users.map((u) => u.toDto()),
    });
    this.users.push(user);
  }

  removeUser(user: User): number {
    this.users = this.users.filter((u) => u.uuid != user.uuid);
    return this.users.length;
  }

  private sendMessage(ws: WebSocket, type: MessageType, data: unknown) {
    ws.send(JSON.stringify({ type, data }));
  }
}
