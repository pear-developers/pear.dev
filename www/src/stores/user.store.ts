import { writable } from "svelte/store";

type User = {
  uuid: string;
  name: string;
  picture: string | null;
};

const { subscribe } = writable<User>({
  uuid: crypto.randomUUID(),
  name: "Anonymous",
  picture: null,
});

export const user = {
  subscribe,
};
