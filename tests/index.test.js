/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import Index from "../src/routes/index.svelte";

describe("Index", () => {
  test("shows content when rendered", () => {
    const { getByText, getByAltText, getByRole } = render(Index);

    expect(getByText("PEAR.DEV")).toBeInTheDocument();
    expect(getByText("Timing is everything!")).toBeInTheDocument();

    const image = getByAltText("Ticking clock shaped like a pear.");
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/pear-clock.gif");

    const input = getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("Enter room name");

    const button = getByText("GO");
    expect(button).toBeInTheDocument();
  });

  test("sets button link to room name", async () => {
    const { getByText, getByRole } = render(Index);
    const input = getByRole("textbox");
    const button = getByText("GO");

    await fireEvent.input(input, { target: { value: "test-room-name" } });

    expect(button.href).toContain("/rooms/test-room-name");
    expect(button).toHaveAttribute("disabled", "false");
  });

  test("clicks on button when input change", async () => {
    const { getByText, getByRole } = render(Index);
    const input = getByRole("textbox");
    const button = getByText("GO");

    const onClick = jest.fn();
    button.addEventListener("click", onClick);

    await fireEvent.change(input, { target: { value: "test-room-name" } });

    expect(onClick).toHaveBeenCalled;
  });

  test("disables button if no room name", () => {
    const { getByText } = render(Index);
    const button = getByText("GO");

    expect(button).toHaveAttribute("disabled", "true");
  });
});
