const { Sequelize, DataTypes } = require("sequelize");
const uuid = require("uuid");

// bringing the models in to scope
const UserModel = require("../src/models/User");

// note: sqlize config
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "sqlite",
});

// note: sync the db
(async () => await sequelize.sync())();

// models
const User = UserModel(sequelize, DataTypes);

User.beforeCreate((user, _) => {
  return (user.id = uuid.v4());
});

module.exports = User;
