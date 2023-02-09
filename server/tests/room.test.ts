import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { Room } from "../src/room.ts";
import { User } from "../src/user.ts";
import { InMemoryWebSocketClient } from "./utils/InMemoryWebSocketClient.ts";

Deno.test("Room: constructor should broadcast roomStatus", () => {
  const ws = new InMemoryWebSocketClient();
  const user = new User(
    "UUID",
    "NAME",
    null,
    ws,
  );

  const room = new Room(user);

  assertEquals(room.users.length, 1);
  assertEquals(ws.sentMessages.length, 1);
  assertEquals(ws.sentMessages[0], {
    type: "RoomStatus",
    data: {
      users: [{
        uuid: "UUID",
        name: "NAME",
        picture: null,
      }],
    },
  });
});

Deno.test("Room: addUser should broadcast room status", () => {
  const ws1 = new InMemoryWebSocketClient();
  const user1 = new User(
    "UUID_1",
    "NAME_1",
    null,
    ws1,
  );
  const ws2 = new InMemoryWebSocketClient();
  const user2 = new User(
    "UUID_2",
    "NAME_2",
    null,
    ws2,
  );

  const room = new Room(user1);

  room.addUser(user2);

  assertEquals(ws1.sentMessages.length, 2);
  assertEquals(ws2.sentMessages.length, 1);
  assertEquals(ws2.sentMessages[0], {
    type: "RoomStatus",
    data: {
      users: [
        {
          uuid: "UUID_1",
          name: "NAME_1",
          picture: null,
        },
        {
          uuid: "UUID_2",
          name: "NAME_2",
          picture: null,
        },
      ],
    },
  });
});
