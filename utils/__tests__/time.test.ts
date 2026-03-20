import { formatTime } from "../time";

describe("formatTime", () => {
  it("returns '0' for 0 seconds", () => {
    expect(formatTime(0)).toBe("0");
  });

  it("returns single digit for seconds under 10", () => {
    expect(formatTime(9)).toBe("9");
  });

  it("returns seconds only when under 60", () => {
    expect(formatTime(45)).toBe("45");
  });

  it("returns mm:ss format for 60+ seconds", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("returns mm:ss format for exact minutes", () => {
    expect(formatTime(120)).toBe("02:00");
  });

  it("returns hh:mm:ss format for 3600+ seconds", () => {
    expect(formatTime(3661)).toBe("01:01:01");
  });

  it("returns hh:mm:ss for exact hours", () => {
    expect(formatTime(3600)).toBe("01:00:00");
  });
});
