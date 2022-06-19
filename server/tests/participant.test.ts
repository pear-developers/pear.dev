import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { Participant } from "../src/participant.ts";
import { InMemoryWebSocketClient } from "./utils/InMemoryWebSocketClient.ts";
import { Role } from "../src/participant.ts";

Deno.test("Participant: UpdateInfo should set name and picture", () => {
  const participant = new Participant(
    "uuid",
    "name",
    "picture",
    Role.Driver,
    new InMemoryWebSocketClient(),
  );
  participant.updateInfo("newName", "newPicture");

  assertEquals(participant.name, "newName");
  assertEquals(participant.picture, "newPicture");
});

Deno.test("Participant: UpdateRole should set role", () => {
  const participant = new Participant(
    "uuid",
    "name",
    "picture",
    Role.Driver,
    new InMemoryWebSocketClient(),
  );
  participant.updateRole(Role.Navigator);

  assertEquals(participant.role, "navigator");
});

Deno.test("Participant: toJSON should serialize", () => {
  const participant = new Participant(
    "uuid",
    "name",
    "picture",
    Role.Driver,
    null as unknown as WebSocketClient,
  );
  const json = participant.toJSON();

  assertEquals(json.uuid, "uuid");
  assertEquals(json.name, "name");
  assertEquals(json.picture, "picture");
  assertEquals(json.role, "driver");
});
