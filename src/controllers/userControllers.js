const UsersService = require("../services/userServices");
require("dotenv").config();

class UsersController {
  async getUser(req, res) {
    try {
      const user = await UsersService.getUser();
      return res.send(user);
    } catch (error) {
      console.log("Error findAll:", error);
    }
  }

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      const allUsers = await UsersService.getUser();
      const existingUser = allUsers.some((user) => user.email === email);

      if (existingUser) {
        return res
          .status(201)
          .json({ error: "Пользователь с таким login уже существует" });
      }

      const newUser = { name, email };

      let result = await UsersService.createUser(newUser);
      res.status(201).json(result);
    } catch (error) {
      console.log("Error createUser:", error);
    }
  }

  async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await UsersService.getUserByEmail(email);
      res.send(user);
    } catch (error) {
      console.log("Error getUserByEmail: ", error);
    }
  }

  async updateUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const { name } = req.body;
      const user = await UsersService.updateUserByEmail(name, email);
      res.send(user);
    } catch (error) {
      console.log("Error getUserByEmail: ", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async deleteUserByEmail(req, res) {
    try {
      const { email } = req.params;
      await UsersService.deleteUserByEmail(email);
      res.status(200).json("DONE");
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}

module.exports = new UsersController();
