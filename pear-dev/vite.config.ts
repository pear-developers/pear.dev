import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { Server } from 'socket.io';


function injectSocketIO(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.emit('eventServer', "Hello from WS Server ✋");
    });

    console.log('SocketIO injected');
}

const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        injectSocketIO(server.httpServer);
    }
};


export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    }
});
