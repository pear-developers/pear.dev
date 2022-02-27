import { WebSocketClient, WebSocketServer } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';
import { Participant } from './participant.ts';
import { Room } from './room.ts';

export class Server {
	wss: WebSocketServer;
	rooms: { [key: string]: Room } = {};

	constructor(port: number) {
		this.wss = new WebSocketServer(port);
		this.wss.on('connection', (ws: WebSocketClient, request: string) =>
			this.onConnection(ws, request)
		);
	}

	onConnection(ws: WebSocketClient, request: string) {
		const roomUrl = request.split('?')[0];
		const params = new URLSearchParams(request.split('?')[1]);
		const client_uuid = params.get('client_id');

		if (client_uuid) {
			const participant = new Participant(client_uuid, ws);

			if (roomUrl in this.rooms) {
				this.rooms[roomUrl].addParticipant(participant);
				ws.send(JSON.stringify(this.rooms[roomUrl]));
			} else {
				this.rooms[roomUrl] = new Room(roomUrl, participant);
				ws.send(JSON.stringify(this.rooms[roomUrl]));
			}
		}
	}
}
