import { MessageType } from "./message.ts";
import { User } from "./user.ts";

export class Room {
  users: User[] = [];

  constructor(user: User) {
    this.users.push(user);
    this.broadcastRoomStatus();
  }

  addUser(user: User) {
    this.users.push(user);
    this.broadcastRoomStatus();
  }

  removeUser(user: User): number {
    this.users = this.users.filter((u) => u.uuid != user.uuid);
    return this.users.length;
  }

  toDto() {
    return {
      users: this.users.map((u) => u.toDto()),
    };
  }

  private broadcastRoomStatus() {
    this.users.forEach((user) => {
      user.ws.send(JSON.stringify({
        type: "RoomStatus",
        data: this.toDto(),
      }));
    });
  }
}
