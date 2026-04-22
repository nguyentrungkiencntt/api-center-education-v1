require("dotenv").config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.CLOUD_NAME, process.env.CLOUD_USER, process.env.CLOUD_PASSWORD, {
    host: process.env.CLOUD_HOST,
    dialect: 'mysql',
    logging: false
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connect };