const sequelize = require("../config/db");

const Books = require("./bookModels");
const Users = require("./userModels");

Users.belongsToMany(Books, { through: 'UsersBooks' });
Books.belongsToMany(Users, { through: 'UsersBooks' });

(async () => {
  try {
    await sequelize.sync();
    console.log("⚡️ Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();

module.exports = { Users, Books };
