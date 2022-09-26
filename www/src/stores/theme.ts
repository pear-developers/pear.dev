import {writable} from "svelte/store";
import { browser } from '$app/environment';

const getColorScheme = () => {
    if (browser) {
        const appearance = localStorage.getItem('appearance')
        const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        return appearance ? appearance : prefersColorScheme;
    }
}

export const theme = writable(getColorScheme())
