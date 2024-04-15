const { Users } = require("../models/models");
class UsersService {
  async getUser() {
    return await Users.findAll();
  }

  async createUser(newUser) {
    const user = await Users.create(newUser);
    return user;
  }
  async getUserByEmail(email) {
    const user = await Users.findOne({ where: { email: email } });
    return user;
  }
  async updateUserByEmail(name, email) {
    const [updatedRowCount, updatedUsers] = await Users.update(
      { name: name },
      { where: { email: email }, returning: true }
    );
    console.log(updatedUsers);
    if (updatedRowCount > 0) {
      return updatedUsers[0];
    } else {
      return null;
    }
  }

  async deleteUserByEmail(email) {
    return await Users.destroy({ where: { email } });
  }
}

module.exports = new UsersService();
