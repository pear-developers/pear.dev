/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Index from "../src/routes/index.svelte";

describe("Index", () => {
  test("shows proper landing page when rendered", () => {
    const { getByText } = render(Index);

    expect(getByText("PEAR.DEV")).toBeInTheDocument();
  });
});
