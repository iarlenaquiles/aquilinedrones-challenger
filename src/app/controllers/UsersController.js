const { User } = require("../models");

class UsersController {
  async index(req, res) {
    const id = req.userId;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json({ user });
  }

  async create(req, res) {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    const { id, createdAt } = user;

    return res.json({ id, name, email, createdAt });
  }
}

module.exports = new UsersController();
