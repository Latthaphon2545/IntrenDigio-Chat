require("dotenv").config();
const Sequelize = require("sequelize");

const database = process.env.DATABASE;
const username = process.env.DB_USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  maxConcurrentQueries: 100,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

module.sequelize = sequelize;

exports.connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};
