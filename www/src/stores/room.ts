import { writable } from 'svelte/store';

type Room = {
	name: string
}

export const room = writable<Room>({name: ''});
