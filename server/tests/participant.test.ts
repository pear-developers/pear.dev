import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { Participant } from "../src/participant.ts";
import { InMemoryWebSocketClient } from "./utils/InMemoryWebSocketClient.ts";

Deno.test("Participant: UpdateInfo should set name and picture", () => {
  const participant = new Participant(
    "uuid",
    "name",
    "picture",
    new InMemoryWebSocketClient(),
  );
  participant.updateInfo("newName", "newPicture");

  assertEquals(participant.name, "newName");
  assertEquals(participant.picture, "newPicture");
});

Deno.test("Participant: toJSON should serialize", () => {
  const participant = new Participant(
    "uuid",
    "name",
    "picture",
    null as unknown as WebSocketClient,
  );
  const json = participant.toJSON();

  assertEquals(json.uuid, "uuid");
  assertEquals(json.name, "name");
  assertEquals(json.picture, "picture");
});
