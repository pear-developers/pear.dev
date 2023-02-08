import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { ClientManager } from "../src/clientManager.ts";
import { AuthMessageData, Message } from "../src/message.ts";
import { InMemoryWebSocketClient } from "./utils/InMemoryWebSocketClient.ts";

Deno.test("ClientManager: addClient should wait for auth message to create a room with user", () => {
  const ws = new InMemoryWebSocketClient();
  const clientManager = new ClientManager();

  clientManager.addClient(ws);
  ws.openAndSendMessage<Message["data"]>("Auth", {
    uuid: "UUID",
    name: "NAME",
    room_id: "ROOM_ID",
    picture: null,
  });

  assertEquals(Object.keys(clientManager.rooms).length, 1);
  assertEquals(clientManager.rooms["ROOM_ID"].users.length, 1);
});

Deno.test("ClientManager: addClient should add user to existing room if room exists", () => {
  const ws_1 = new InMemoryWebSocketClient();
  const ws_2 = new InMemoryWebSocketClient();
  const clientManager = new ClientManager();

  clientManager.addClient(ws_1);
  ws_1.openAndSendMessage<AuthMessageData>("Auth", {
    uuid: "UUID_1",
    name: "NAME_1",
    room_id: "ROOM_ID",
    picture: null,
  });
  clientManager.addClient(ws_2);
  ws_2.openAndSendMessage<AuthMessageData>("Auth", {
    uuid: "UUID_2",
    name: "NAME_2",
    room_id: "ROOM_ID",
    picture: null,
  });

  assertEquals(Object.keys(clientManager.rooms).length, 1);
  assertEquals(clientManager.rooms["ROOM_ID"].users.length, 2);
  assertEquals(clientManager.rooms["ROOM_ID"].users[0].name, "NAME_1");
  assertEquals(clientManager.rooms["ROOM_ID"].users[1].name, "NAME_2");
});

Deno.test("ClientManager: addClient onclose should delete room if no more participant", () => {
  const ws = new InMemoryWebSocketClient();
  const clientManager = new ClientManager();

  clientManager.addClient(ws);
  ws.openAndSendMessage<Message["data"]>("Auth", {
    uuid: "UUID",
    name: "NAME",
    room_id: "ROOM_ID",
    picture: null,
  });
  ws.close();

  assertEquals(Object.keys(clientManager.rooms).length, 0);
});
