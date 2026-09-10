const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

const poolConfig = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

const dialectOptions = {
  connectTimeout: 60000,
  ...(process.env.DB_SSL === "false"
    ? {}
    : {
        ssl: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: false
        }
      })
};

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    logging: false,
    pool: poolConfig,
    dialectOptions
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "centre_lead_tracker",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",
    {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      logging: false,
      pool: poolConfig,
      dialectOptions
    }
  );
}

module.exports = sequelize;