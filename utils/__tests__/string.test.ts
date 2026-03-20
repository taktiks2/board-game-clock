import { padStart } from "../string";

describe("padStart", () => {
  it("pads single digit with leading zero", () => {
    expect(padStart("5")).toBe("05");
  });

  it("keeps two digit string as is", () => {
    expect(padStart("12")).toBe("12");
  });

  it("pads empty string to '00'", () => {
    expect(padStart("")).toBe("00");
  });
});
