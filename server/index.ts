import { WebSocketClient, WebSocketServer } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';

class Participant {
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

class Room {
	url: string;
	participants: { [uuid: string]: Participant } = {};

	constructor(url: string, creator: Participant) {
		this.url = url;
		this.participants[creator.uuid] = creator;
	}

	addParticipant(participant: Participant) {
		if (!(participant.uuid in this.participants)) this.participants[participant.uuid] = participant;
	}
}

class Server {
	wss: WebSocketServer;
	rooms: { [key: string]: Room } = {};

	constructor(port: number) {
		this.wss = new WebSocketServer(5000);
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

const s = new Server(5000);
