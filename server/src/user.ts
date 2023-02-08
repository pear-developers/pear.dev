export class User {
  uuid: string;
  name: string;
  picture: string | null;
  ws: WebSocket;

  constructor(
    uuid: string,
    name: string,
    picture: string | null,
    ws: WebSocket,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.picture = picture;
    this.ws = ws;
  }

  toDto(): Pick<User, "uuid" | "name" | "picture"> {
    return { uuid: this.uuid, name: this.name, picture: this.picture };
  }
}
