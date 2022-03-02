import {
	EventEmitter,
	GenericFunction,
	WrappedFunction
} from 'https://deno.land/std@0.92.0/node/events.ts';
import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.3/mod.ts';

export class InMemoryWebSocketClient extends EventEmitter implements WebSocketClient {
	onEvents: Record<string | symbol, GenericFunction> = {};
	sent: string[] = [];

	send(message: string | Uint8Array): void {
		this.sent.push(message.toString());
	}
	ping(message?: string | Uint8Array): void {
		throw new Error('Method not implemented.');
	}
	close(code: number, reason?: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	closeForce(): void {
		throw new Error('Method not implemented.');
	}
	isClosed: boolean | undefined;
	public addListener(
		eventName: string | symbol,
		listener: GenericFunction | WrappedFunction
	): this {
		throw new Error('Method not implemented.');
	}
	public emit(eventName: string | symbol, ...args: any[]): boolean {
		throw new Error('Method not implemented.');
	}
	public eventNames(): [string | symbol] {
		throw new Error('Method not implemented.');
	}
	public getMaxListeners(): number {
		throw new Error('Method not implemented.');
	}
	public listenerCount(eventName: string | symbol): number {
		throw new Error('Method not implemented.');
	}
	public listeners(eventName: string | symbol): GenericFunction[] {
		throw new Error('Method not implemented.');
	}
	public rawListeners(eventName: string | symbol): (GenericFunction | WrappedFunction)[] {
		throw new Error('Method not implemented.');
	}
	public off(eventName: string | symbol, listener: GenericFunction): this {
		throw new Error('Method not implemented.');
	}
	public on(eventName: string | symbol, listener: GenericFunction | WrappedFunction): this {
		this.onEvents[eventName] = listener as GenericFunction;
		return this;
	}
	public once(eventName: string | symbol, listener: GenericFunction): this {
		throw new Error('Method not implemented.');
	}
	public prependListener(
		eventName: string | symbol,
		listener: GenericFunction | WrappedFunction
	): this {
		throw new Error('Method not implemented.');
	}
	public prependOnceListener(eventName: string | symbol, listener: GenericFunction): this {
		throw new Error('Method not implemented.');
	}
	public removeAllListeners(eventName?: string | symbol): this {
		throw new Error('Method not implemented.');
	}
	public removeListener(eventName: string | symbol, listener: GenericFunction): this {
		throw new Error('Method not implemented.');
	}
	public setMaxListeners(n: number): this {
		throw new Error('Method not implemented.');
	}
}
