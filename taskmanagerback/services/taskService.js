//services/taskService.js
const Task = require('../models/task');

class TaskService {
    async createTask(description, completed, deadline, category, priority) {
        return Task.create({ description, completed, deadline, category, priority });
    }

    async getAllTasks() {
        return Task.findAll();
    }

    async getTaskById(id) {
        return Task.findOne({ where: { id } });
    }

    async deleteTask(id) {
        return Task.destroy({ where: { id } });
    }

    async updateTask(id, description, completed, deadline, category, priority) {
        return Task.update({ description, completed, deadline, category, priority }, { where: { id } });
    }
}

module.exports = new TaskService();