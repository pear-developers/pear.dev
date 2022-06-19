import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";

export enum Role {
  Driver = "driver",
  Navigator = "navigator",
  Passenger = "passenger",
}

export class Participant {
  uuid: string;
  name: string;
  picture: string;
  role: Role;
  ws: WebSocketClient;

  constructor(
    uuid: string,
    name: string,
    picture: string,
    role: Role,
    ws: WebSocketClient,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.picture = picture;
    this.role = role;
    this.ws = ws;
  }

  updateInfo(name: string, picture: string) {
    this.name = name;
    this.picture = picture;
  }

  updateRole(role: Role) {
    this.role = role;
  }

  toJSON() {
    return {
      uuid: this.uuid,
      name: this.name,
      picture: this.picture,
      role: this.role,
    };
  }
}
