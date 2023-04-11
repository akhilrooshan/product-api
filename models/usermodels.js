const sequelize = require('./index')
const { DataTypes } = require('sequelize')
const userlogin = sequelize.define("users", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'user']]
        }
    },

}, {
    timestamps: false
})


module.exports = userlogin