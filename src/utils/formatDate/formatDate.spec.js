// const formatDate = require("./formatDate").formatDate;
// or
import { formatDate } from "./formatDate";

describe("test formate date", () => {
  test("formatDate", () => {
    expect(formatDate(null, "yyyyMMdd")).toEqual("");
    expect(formatDate(new Date("2020-11-11"), "yyyyMMdd")).toEqual("20201111");
    expect(
      formatDate(new Date("2020-11-11 10:11:11").getTime(), "yyyyMMdd-hh:mm:ss")
    ).toEqual("20201111-10:11:11");
    expect(
      formatDate(
        Math.floor(new Date("2020-11-11").getTime() / 1000),
        "yyyyMMdd"
      )
    ).toEqual("20201111");
  });
});
