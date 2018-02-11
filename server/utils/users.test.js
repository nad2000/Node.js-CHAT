const expect = require("expect");
const {
  Users
} = require("./users");

describe("Users", () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: "Mike",
      room: "Node Course"
    }, {
      id: '2',
      name: "Jen",
      room: "React Course"
    }, {
      id: '3',
      name: "Julie",
      room: "Node Course"
    }];
  });

  it("should get list of users for node course", () => {
    var userList = users.getUserList("Node Course");
    expect(userList).toEqual(["Mike", "Julie"]);
  });

  it("should get list of users for React course", () => {
    var userList = users.getUserList("React Course");
    expect(userList).toEqual(["Jen"]);
  });

  it("should find a user", () => {
    var expectedUser = users.users[0];
    expect(users.getUser('1')).toBe(expectedUser);
  });

  it("should not find a user", () => {
    expect(users.getUser("42")).toBeFalsy();
  });

  it("should remove a user", () => {
    var expectedUser = users.users[2];
    expect(users.removeUser('3')).toMatchObject(expectedUser);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    expect(users.removeUser("42")).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it("should add a new user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Jack",
      room: "The Office Fans"
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
});

