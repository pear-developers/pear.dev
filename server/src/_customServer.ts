import { handler } from "./handler.js";
import { env } from "./env.js";
import { Application } from "./deps.ts";
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { ClientManager } from "./clientManager.ts";

const path = env("SOCKET_PATH", false);
const host = env("HOST", "0.0.0.0");
const port = env("PORT", !path && "3000");

// TODO: add compression middleware
const app = new Application();
const router = new Router();

const clientManager = new ClientManager();

router.get("/wss/:room", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }
  const ws: WebSocket = ctx.upgrade();
  clientManager.addClient(ws);
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(handler);

app.addEventListener("listen", () => {
  console.log(`Listening on http://${addr}`);
});

const addr = path || `${host}:${port}`;
app.listen(addr).catch((err: Error) => {
  console.error("error", err);
});

export { app as server, host, path, port };
