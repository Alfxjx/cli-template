import { parseIndex } from "./index.js";

describe("test parse Table index", () => {
  test("page index", () => {
    expect(parseIndex(0, 1, 10)).toEqual(1);
  });
  test("error input", () => {
    expect(parseIndex(-1, 1, 10)).toBe(false);
    expect(parseIndex(1, 0, 5)).toBe(false);
    expect(parseIndex(1, 2, 0)).toBe(false);
    expect(parseIndex(1, 2, 1)).toBe(false);
  });
});
