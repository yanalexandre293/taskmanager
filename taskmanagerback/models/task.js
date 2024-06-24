//models/task.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priority:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

Task.sync();
module.exports = Task;