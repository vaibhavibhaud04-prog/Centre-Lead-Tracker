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
  ...(process.env.DB_SSL === "true" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {})
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
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      logging: false,
      pool: poolConfig,
      dialectOptions
    }
  );
}

module.exports = sequelize;