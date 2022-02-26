const WebSocketServer = require('ws');
 
const wss = new WebSocketServer.Server({ port: 5000 })

let rooms = [];

class Participant{
  constructor(id) {
    this.id = id;
    // this.ws = ws;
  }
}

class Room {
  constructor(url, creator) {
    this.url = url;
    this.participants = [creator];
  }
}
 
wss.on("connection", (ws, request) => {
    const url = request.url.split("?")[0]
    const uuid = request.url.split("?")[1].split("=")[1]
    
    const client_ip = "test";
    const participant = new Participant(uuid);

    let found = false;
    for (const room of rooms) {
      if(room.url == url) {
        found = true;
        room.participants.push(participant);
        ws.send(JSON.stringify(room));
      }
    }
    if(!found) {
      let room = new Room(url, participant);
      rooms.push(room);
      ws.send(JSON.stringify(room));
    }

    // ws.send("HELLO CLIENT");

    // ws.on("message", data => {
    //     console.log(`Client has sent us: ${data}`)
    // });

    // ws.on("close", () => {
    //     console.log("the client has connected");
    // });

    // ws.onerror = function () {
    //     console.log("Some Error occurred")
    // }
});
console.log("The WebSocket server is running on port 5000");