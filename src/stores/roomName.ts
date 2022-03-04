import { writable } from "svelte/store";

const roomName = writable<string>('');

export default roomName;