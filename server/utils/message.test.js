const expect = require("expect")
const {generateMessage} = require("./message");


describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Jen";
    const text = "Some message";
    var msg = generateMessage(from, text);
    expect(typeof msg.createdAt).toBe("number");
    expect(msg).toMatchObject({from, text});
  });
});




