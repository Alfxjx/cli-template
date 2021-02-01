import { nullValidate, passwordValidate } from "./index";

describe("validate test null", () => {
  test("null string", () => {
    expect(nullValidate("")).toBe(true);
  });
  test("null", () => {
    expect(nullValidate(null)).toBe(true);
  });
  test("undefined", () => {
    expect(nullValidate(undefined)).toBe(true);
  });
  test("not null", () => {
    expect(nullValidate("123")).toBe(false);
  });
});

describe("test password validator", () => {
  test("all numbers", () => {
    expect(passwordValidate("123456789")).toBe(false);
  });
  test("all characters", () => {
    expect(passwordValidate("asdfgqwerA")).toBe(false);
  });
  test("password 8 ok", () => {
    expect(passwordValidate("123Axa12")).toBe(true);
  });
  test("password 18 false", () => {
    expect(passwordValidate("123Axa12123Axa12ww")).toBe(false);
  });
});
