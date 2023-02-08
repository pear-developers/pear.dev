import { Message, MessageType } from "../../src/message.ts";

export class InMemoryWebSocketClient implements WebSocket {
  binaryType: BinaryType = "arraybuffer";
  bufferedAmount = 0;
  extensions = "";
  onclose: (this: WebSocket, ev: CloseEvent) => any = () => {};
  onerror: (this: WebSocket, ev: Event | ErrorEvent) => any = () => {};
  onmessage: (this: WebSocket, ev: MessageEvent<any>) => any = () => {};
  onopen: (this: WebSocket, ev: Event) => any = () => {};
  protocol = "";
  readyState = 0;
  url = "";

  CLOSED = 0;
  CLOSING = 1;
  CONNECTING = 2;
  OPEN = 3;

  sentMessages: Message[] = [];

  close(code?: number | undefined, reason?: string | undefined): void {
    this.onclose(new CloseEvent(""));
  }

  send(data: string): void {
    this.sentMessages.push(JSON.parse(data));
  }

  addEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw new Error("Method not implemented.");
  }

  removeEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown,
  ): void {
    throw new Error("Method not implemented.");
  }

  dispatchEvent(event: Event): boolean {
    throw new Error("Method not implemented.");
  }

  openAndSendMessage<T>(type: MessageType, data: T) {
    this.onopen(new Event(""));
    const msg = new MessageEvent("string", {
      data: JSON.stringify({
        data,
        type,
      }),
    });
    this.onmessage(msg);
  }
}
