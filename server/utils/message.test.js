const expect = require("expect")
const {generateMessage, generateLocationMessage} = require("./message");


describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Jen";
    const text = "Some message";
    var msg = generateMessage(from, text);
    expect(typeof msg.createdAt).toBe("number");
    expect(msg).toMatchObject({from, text});
  });
});


describe("generateLocationMessage", () => {
  it("should generate correct location message object", () => {
    const from = "Jen";
    const latitude = 123;
    const longitude = 987;
    var msg = generateLocationMessage(from, latitude, longitude);
    expect(typeof msg.createdAt).toBe("number");
    expect(msg).toMatchObject({from, url: "https://www.google.com/maps?q=123,987"});
  });
});




