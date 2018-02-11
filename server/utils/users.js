var users = [];


class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(u => u.id !== id);
      return user;
    }
  }

  getUser(id) {
    return this.users.filter(u => u.id === id)[0];
  }

  getUserList(room) {
    return this.users.filter(u => u.room === room).map(u => u.name);
  }

}

module.exports = {
  Users
};

