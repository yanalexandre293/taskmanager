//config/database.js

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('taskmanager','root','',{
    dialect: 'mysql',
    host: 'localhost',
    timezone: '-03:00'
});

module.exports = sequelize;