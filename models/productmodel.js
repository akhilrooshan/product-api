const sequelize = require('./index')
const { DataTypes } = require('sequelize')
const usertable = require('./usermodels')
/**
 * @description:table columns defining
 */
const Product = sequelize.define("productlist",
    {
        productname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,


        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }, price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        userid: {
            type: DataTypes.BIGINT,
            references: {
                model: usertable,
                key: 'id'
            },
            allowNull: false
        }

    },
    {
        timestamps: true,

    });

Product.belongsTo(usertable, { foreignKey: 'userid' });
usertable.hasMany(Product, { foreignKey: 'userid' });

module.exports = Product
