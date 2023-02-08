import { Server } from "./server.ts";
import { serve } from "https://deno.land/std/http/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const wsServer = new Server();
const env = config({
    path: "../.env.local"
});
console.log()
async function reqHandler(req: Request) {
    if (req.headers.get("upgrade") != "websocket") {
        return new Response(null, { status: 501 });
    }
    const { socket: ws, response } = Deno.upgradeWebSocket(req);
    ws.onopen = () => {
        console.log("Connected to client");
        wsServer.onConnection(ws, req.url);
    };
    return response;
}
serve(reqHandler, { port: env["VITE_WS_PORT"] });
