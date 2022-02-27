import { WebSocketClient, WebSocketServer } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';
import { RoomConnectionMessage } from './message.ts';
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
		const name = params.get('name');

		if (client_uuid && name) {
			const participant = new Participant(client_uuid, name, ws);

			if (roomUrl in this.rooms) this.rooms[roomUrl].addParticipant(participant);
			else this.rooms[roomUrl] = new Room(roomUrl, participant);

			ws.send(JSON.stringify(new RoomConnectionMessage(this.rooms[roomUrl])));
		}

		ws.on('close', () => {
			if (roomUrl in this.rooms && client_uuid) this.rooms[roomUrl].removeParticipant(client_uuid);
		});
	}
}
