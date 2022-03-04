import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { Participant } from "../src/participant.ts";
import { Room } from "../src/room.ts";
import { TimerState } from "../src/timer.ts";
import { InMemoryWebSocketClient } from "./utils/InMemoryWebSocketClient.ts";

const WithouthInitialMessage = (sent: string[]): string[] => {
  return sent.filter((m) => !m.includes("RoomConnection"));
};

Deno.test("Room: AddParticipant should send room data", () => {
  const ws = new InMemoryWebSocketClient();
  const creator = new Participant("uuid", "name", "picture", ws);
  const _ = new Room("url", creator);

  assertEquals(Object.keys(ws.sent).length, 1);
  assertEquals(
    ws.sent[0],
    '{"message_type":"RoomConnection","content":{"url":"url","participants":{"uuid":{"uuid":"uuid","name":"name","picture":"picture"}},"timer":{"remaining":5999,"state":"Stopped","lastStartTime":-1,"duration":5999}}}',
  );
});

Deno.test("Room: AddParticipant should not add if in list and not broadcast message", () => {
  const ws = new InMemoryWebSocketClient();
  const creator = new Participant("uuid", "name", "picture", ws);
  const room = new Room("url", creator);
  room.addParticipant(creator);

  assertEquals(Object.keys(room.participants).length, 1);
  assertEquals(room.participants["uuid"].name, "name");
  assertEquals(Object.keys(WithouthInitialMessage(ws.sent)).length, 0);
});

Deno.test("Room: AddParticipant should add if not in list and broadcast update", () => {
  const creatorWs = new InMemoryWebSocketClient();
  const newWs = new InMemoryWebSocketClient();
  const creator = new Participant("uuid", "name", "picture", creatorWs);
  const newParticipant = new Participant(
    "uuid_new",
    "name_new",
    "picture_new",
    newWs,
  );
  const room = new Room("url", creator);
  room.addParticipant(newParticipant);

  assertEquals(Object.keys(room.participants).length, 2);
  assertEquals(room.participants["uuid_new"].name, "name_new");
  assertEquals(Object.keys(WithouthInitialMessage(creatorWs.sent)).length, 1);
  assertEquals(
    WithouthInitialMessage(creatorWs.sent)[0],
    '{"message_type":"ParticipantAdded","content":{"uuid":"uuid_new","name":"name_new","picture":"picture_new"}}',
  );
  assertEquals(Object.keys(WithouthInitialMessage(newWs.sent)).length, 0);
});

Deno.test("Room: RemoveParticipant should remove and return true is empty", () => {
  const creator = new Participant(
    "uuid",
    "name",
    "picture",
    new InMemoryWebSocketClient(),
  );
  const room = new Room("url", creator);
  const result = room.removeParticipant(creator.uuid);

  assertEquals(result, true);
  assertEquals(Object.keys(room.participants).length, 0);
});

Deno.test("Room: RemoveParticipant should remove and broadcast update", () => {
  const ws = new InMemoryWebSocketClient();
  const creator = new Participant(
    "uuid",
    "name",
    "picture",
    new InMemoryWebSocketClient(),
  );
  const newParticipant = new Participant(
    "uuid_new",
    "name_new",
    "picture_new",
    ws,
  );
  const room = new Room("url", creator);
  room.addParticipant(newParticipant);
  const result = room.removeParticipant(creator.uuid);

  assertEquals(result, false);
  assertEquals(Object.keys(room.participants).length, 1);
  assertEquals(room.participants["uuid"], undefined);
  assertEquals(Object.keys(WithouthInitialMessage(ws.sent)).length, 1);
  assertEquals(
    WithouthInitialMessage(ws.sent)[0],
    '{"message_type":"ParticipantRemoved","content":{"uuid":"uuid","name":"name","picture":"picture"}}',
  );
});

Deno.test("Room: BindParticipantWS should update participant info and broadcast on message", () => {
  const ws = new InMemoryWebSocketClient();
  const ws2 = new InMemoryWebSocketClient();
  const room = new Room("url", new Participant("uuid", "name", "picture", ws));
  room.participants["uuid2"] = new Participant(
    "uuid_new",
    "name_new",
    "picture_new",
    ws2,
  );
  room.bindParticipantWS(ws);

  ws.onEvents["message"](
    '{"message_type":"ParticipantInfoUpdate", "content":{"uuid":"uuid","name":"nameUpdate","picture":"pictureUpdate"}}',
  );

  assertEquals(room.participants["uuid"].name, "nameUpdate");
  assertEquals(room.participants["uuid"].picture, "pictureUpdate");
  assertEquals(Object.keys(WithouthInitialMessage(ws.sent)).length, 0);
  assertEquals(Object.keys(WithouthInitialMessage(ws2.sent)).length, 1);
});

Deno.test("Room: BindParticipantWS should start timer and broadcast on message", () => {
  const ws = new InMemoryWebSocketClient();
  const ws2 = new InMemoryWebSocketClient();
  const room = new Room("url", new Participant("uuid", "name", "picture", ws));
  room.participants["uuid2"] = new Participant(
    "uuid_new",
    "name_new",
    "picture_new",
    ws2,
  );
  room.bindParticipantWS(ws);

  ws.onEvents["message"](
    '{"message_type":"TimerStart", "content":{"timestamp":"1"}}',
  );

  assertEquals(room.timer.state, TimerState.Running);
  assertEquals(room.timer.lastStartTime, 1);
  assertEquals(Object.keys(WithouthInitialMessage(ws.sent)).length, 1);
  assertEquals(Object.keys(WithouthInitialMessage(ws2.sent)).length, 1);
});

Deno.test("Room: BindParticipantWS should stop timer and broadcast on message", () => {
  const ws = new InMemoryWebSocketClient();
  const ws2 = new InMemoryWebSocketClient();
  const room = new Room("url", new Participant("uuid", "name", "picture", ws));
  room.participants["uuid2"] = new Participant(
    "uuid_new",
    "name_new",
    "picture_new",
    ws2,
  );
  room.bindParticipantWS(ws);

  ws.onEvents["message"](
    '{"message_type":"TimerStop", "content":{"timestamp":"2"}}',
  );

  assertEquals(room.timer.state, TimerState.Stopped);
  assertEquals(Object.keys(WithouthInitialMessage(ws.sent)).length, 1);
  assertEquals(Object.keys(WithouthInitialMessage(ws2.sent)).length, 1);
});

Deno.test("Room: BindParticipantWS should return on unrecognized message", () => {
  const ws = new InMemoryWebSocketClient();
  const room = new Room("url", new Participant("uuid", "name", "picture", ws));
  room.bindParticipantWS(ws);

  ws.onEvents["message"]('{"message_type":"DEFAULT", "content":{}}');

  assertEquals(Object.keys(WithouthInitialMessage(ws.sent)).length, 0);
});
