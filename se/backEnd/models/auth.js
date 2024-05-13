const Sequelizev = require("sequelize");
const { sequelize } = require("./dbhelper");

const Registration = sequelize.define("registration", {
  username: {
    type: Sequelizev.STRING(20),
    allowNull: false,
  },
  password: {
    type: Sequelizev.STRING(100),
    allowNull: false,
  },
  salt: {
    type: Sequelizev.STRING(100),
    allowNull: false,
  },
});

exports.registration = (username, password, salt) => {
    return Registration.create({
        username: username,
        password: password,
        salt: salt,
    });
};
