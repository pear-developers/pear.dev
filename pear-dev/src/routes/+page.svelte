<script lang="ts">
	import { browser } from "$app/environment";
    import ioClient from 'socket.io-client';

    let msg: string[] = [];
	if (browser) {
        const socket = ioClient('http://localhost:3000');
        socket.on('eventServer', (m) => {
            msg = [...msg, m];
        })
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#each msg as m}
    <p>{m}</p>
{/each}