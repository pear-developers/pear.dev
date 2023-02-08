import { handler } from './handler.js';
import { env } from './env.js';
import { Application } from './deps.ts';
import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { Server } from '../server/src/server.ts'

const path = env('SOCKET_PATH', false);
const host = env('HOST', '0.0.0.0');
const port = env('PORT', !path && '3000');

// TODO: add compression middleware
const app = new Application();
const router = new Router();

const wsServer = new Server();

router.get("/wss/:room", (ctx) => {
	if (!ctx.isUpgradable) {
	  ctx.throw(501);
	}
	const ws = ctx.upgrade();
	ws.onopen = () => {
		console.log("Connected to client");
		wsServer.onConnection(ws, ctx.request.url.href);
		// ws.send("Hello from server!");
	};
	// Define ws callbacks
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(handler);

app.addEventListener('listen', () => {
	console.log(`Listening on http://${addr}`);
});

const addr = path || `${host}:${port}`;
app.listen(addr).catch((err) => {
	console.error('error', err);
});

export { host, path, port, app as server };
