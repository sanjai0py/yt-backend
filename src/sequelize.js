const { Sequelize, DataTypes } = require("sequelize");

// bringing the models in to scope
const UserModel = require("../src/models/User");

// note: sqlize config
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "sqlite",
});

// note: sync the db
(async () => await sequelize.sync({ force: true }))();

// models
const User = UserModel(sequelize, DataTypes);

// module.exports = {
//   User,
// };

module.exports = User;
