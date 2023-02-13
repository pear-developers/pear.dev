import { writable } from "svelte/store";
import { browser } from "$app/environment";

type User = {
  uuid: string;
  name: string;
  picture: string | null;
};

const defaultUser: User = {
  uuid: crypto.randomUUID(),
  name: "Anonymous",
  picture: null,
};

const getValue = (): User => {
  if (browser) {
    const userStr = window.localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : defaultUser;
  }
  return defaultUser;
};

const { subscribe, update } = writable<User>(getValue());

export const user = {
  subscribe,
  setName: (name: string) => {
    update((previous: User) => {
      return { ...previous, name };
    });
  },
};
