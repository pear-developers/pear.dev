import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';

export class Participant {
	uuid: string;
	name: string;
	picture: string;
	ws: WebSocketClient;

	constructor(uuid: string, name: string, picture: string, ws: WebSocketClient) {
		this.uuid = uuid;
		this.name = name;
		this.picture = picture;
		this.ws = ws;
	}

	updateInfo(name: string) {
		this.name = name;
	}

	toJSON() {
		return {
			uuid: this.uuid,
			name: this.name
		};
	}
}
