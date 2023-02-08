import { ClientManager } from "./clientManager.ts";
import { serve } from "https://deno.land/std/http/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const clientManager = new ClientManager();
const env = config({
  path: "../.env.local",
});

function reqHandler(req: Request) {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  clientManager.addClient(ws);
  return response;
}
serve(reqHandler, { port: parseInt(env["VITE_WS_PORT"]) });
