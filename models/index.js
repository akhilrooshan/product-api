const dbconfig = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect: dbconfig.DIALECT,
        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
)
sequelize.authenticate(async (req, res) => {
    try {
        await console.log("Connected");
    } catch (error) {
        await console.log(error.message);
    }
})
sequelize.sync({alter:true})
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
module.exports = sequelize