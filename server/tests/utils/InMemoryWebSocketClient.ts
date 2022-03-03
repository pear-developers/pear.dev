import {
  EventEmitter,
  GenericFunction,
  WrappedFunction,
} from "https://deno.land/std@0.92.0/node/events.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.3/mod.ts";

export class InMemoryWebSocketClient extends EventEmitter
  implements WebSocketClient {
  onEvents: Record<string | symbol, GenericFunction> = {};
  sent: string[] = [];

  send(message: string | Uint8Array): void {
    this.sent.push(message.toString());
  }
  ping(_message?: string | Uint8Array): void {
    throw new Error("Method not implemented.");
  }
  close(_code: number, _reason?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  closeForce(): void {
    throw new Error("Method not implemented.");
  }
  isClosed: boolean | undefined;
  public addListener(
    _eventName: string | symbol,
    _listener: GenericFunction | WrappedFunction,
  ): this {
    throw new Error("Method not implemented.");
  }
  // deno-lint-ignore no-explicit-any
  public emit(_eventName: string | symbol, ..._args: any[]): boolean {
    throw new Error("Method not implemented.");
  }
  public eventNames(): [string | symbol] {
    throw new Error("Method not implemented.");
  }
  public getMaxListeners(): number {
    throw new Error("Method not implemented.");
  }
  public listenerCount(_eventName: string | symbol): number {
    throw new Error("Method not implemented.");
  }
  public listeners(_eventName: string | symbol): GenericFunction[] {
    throw new Error("Method not implemented.");
  }
  public rawListeners(
    _eventName: string | symbol,
  ): (GenericFunction | WrappedFunction)[] {
    throw new Error("Method not implemented.");
  }
  public off(_eventName: string | symbol, _listener: GenericFunction): this {
    throw new Error("Method not implemented.");
  }
  public on(
    eventName: string | symbol,
    listener: GenericFunction | WrappedFunction,
  ): this {
    this.onEvents[eventName] = listener as GenericFunction;
    return this;
  }
  public once(_eventName: string | symbol, _listener: GenericFunction): this {
    throw new Error("Method not implemented.");
  }
  public prependListener(
    _eventName: string | symbol,
    _listener: GenericFunction | WrappedFunction,
  ): this {
    throw new Error("Method not implemented.");
  }
  public prependOnceListener(
    _eventName: string | symbol,
    _listener: GenericFunction,
  ): this {
    throw new Error("Method not implemented.");
  }
  public removeAllListeners(_eventName?: string | symbol): this {
    throw new Error("Method not implemented.");
  }
  public removeListener(
    _eventName: string | symbol,
    _listener: GenericFunction,
  ): this {
    throw new Error("Method not implemented.");
  }
  public setMaxListeners(_n: number): this {
    throw new Error("Method not implemented.");
  }
}
