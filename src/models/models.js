const sequelize = require("../config/db");

const Books = require("./bookModels");
const Users = require("./userModels");

Users.hasMany(Books, { foreignKey: "userId" });
Books.belongsTo(Users, { foreignKey: "userId" });

(async () => {
  try {
    await sequelize.sync();
    console.log("⚡️ Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();

module.exports = { Users, Books };
