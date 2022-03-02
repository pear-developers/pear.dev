import { assertEquals } from 'https://deno.land/std@0.127.0/testing/asserts.ts';
import { Participant } from '../src/participant.ts';
import { Room } from '../src/room.ts';
import { InMemoryWebSocketClient } from './utils/InMemoryWebSocketClient.ts';

Deno.test('Room: AddParticipant should not add if in list and not broadcast message', () => {
	const ws = new InMemoryWebSocketClient();
	const creator = new Participant('uuid', 'name', 'picture', ws);
	const room = new Room('url', creator);
	room.addParticipant(creator);

	assertEquals(Object.keys(room.participants).length, 1);
	assertEquals(room.participants['uuid'].name, 'name');
	assertEquals(Object.keys(ws.sent).length, 0);
});

Deno.test('Room: AddParticipant should add if not in list and broadcast update', () => {
	const creatorWs = new InMemoryWebSocketClient();
	const newWs = new InMemoryWebSocketClient();
	const creator = new Participant('uuid', 'name', 'picture', creatorWs);
	const newParticipant = new Participant('uuid_new', 'name_new', 'picture_new', newWs);
	const room = new Room('url', creator);
	room.addParticipant(newParticipant);

	assertEquals(Object.keys(room.participants).length, 2);
	assertEquals(room.participants['uuid_new'].name, 'name_new');
	assertEquals(Object.keys(creatorWs.sent).length, 1);
	assertEquals(
		creatorWs.sent[0],
		'{"message_type":"ParticipantAdded","content":{"uuid":"uuid_new","name":"name_new","picture":"picture_new"}}'
	);
	assertEquals(Object.keys(newWs.sent).length, 0);
});

Deno.test('Room: RemoveParticipant should remove and return true is empty', () => {
	const creator = new Participant('uuid', 'name', 'picture', new InMemoryWebSocketClient());
	const room = new Room('url', creator);
	const result = room.removeParticipant(creator.uuid);

	assertEquals(result, true);
	assertEquals(Object.keys(room.participants).length, 0);
});

Deno.test('Room: RemoveParticipant should remove and broadcast update', () => {
	const ws = new InMemoryWebSocketClient();
	const creator = new Participant('uuid', 'name', 'picture', new InMemoryWebSocketClient());
	const newParticipant = new Participant('uuid_new', 'name_new', 'picture_new', ws);
	const room = new Room('url', creator);
	room.addParticipant(newParticipant);
	const result = room.removeParticipant(creator.uuid);

	assertEquals(result, false);
	assertEquals(Object.keys(room.participants).length, 1);
	assertEquals(room.participants['uuid'], undefined);
	assertEquals(Object.keys(ws.sent).length, 1);
	assertEquals(
		ws.sent[0],
		'{"message_type":"ParticipantRemoved","content":{"uuid":"uuid","name":"name","picture":"picture"}}'
	);
});
