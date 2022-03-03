import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { Timer } from "../src/timer.ts";
import { TimerState } from "../src/timer.ts";

Deno.test("Timer: Start should set state and lastStartTime", () => {
  const timer = new Timer(2);
  timer.start(1);

  assertEquals(timer.lastStartTime, 1);
  assertEquals(timer.state, TimerState.Running);
});

Deno.test("Timer: Stop should update remaining state", () => {
  const timer = new Timer(2);
  timer.start(1);
  timer.stop(2);

  assertEquals(timer.remaining, 1);
  assertEquals(timer.state, TimerState.Stopped);
});

Deno.test("Timer: Stop should reset remaining if fully elapsed", () => {
  const timer = new Timer(2);
  timer.start(1);
  timer.stop(3);

  assertEquals(timer.remaining, 2);
  assertEquals(timer.state, TimerState.Stopped);
});

Deno.test("Timer: toJSON should serialize", () => {
  const timer = new Timer(2);
  const json = timer.toJSON();

  assertEquals(json.remaining, 2);
  assertEquals(json.state, TimerState.Stopped);
  assertEquals(json.lastStartTime, -1);
  assertEquals(json.duration, 2);
});
