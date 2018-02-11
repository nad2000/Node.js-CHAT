const expect = require("expect");
const {isRealString} = require("./validation.js");


describe("isRealString", () => {

  it("should reject non-string values",  () => {
    expect(isRealString(123)).toBe(false);
    expect(isRealString(true)).toBe(false);
    expect(isRealString(undefined)).toBe(false);
  });

  it("should reject sting with only spaces", () => {
    expect(isRealString("                  ")).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    expect(isRealString("iABC")).toBe(true);
  });

});

