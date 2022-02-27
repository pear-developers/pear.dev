import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';

export class Participant {
	uuid: string;
	ws: WebSocketClient;

	constructor(uuid: string, ws: WebSocketClient) {
		this.uuid = uuid;
		this.ws = ws;
	}

	toJSON() {
		return {
			uuid: this.uuid
		};
	}
}
