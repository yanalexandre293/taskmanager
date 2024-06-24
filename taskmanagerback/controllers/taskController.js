//controllers/taskController.js
const taskService = require('../services/taskService');

class TaskController {
    async createUser(req, res) {
        const { description, completed, deadline, category, priority } = req.body;

        try{
            const newTask = await taskService.createTask(description, completed, deadline, category, priority);
            res.status(201).json(newTask);
        }catch(error){
            console.error("Erro ao criar tarefa: ", error);
            res.status(500).json({ error: "Erro ao criar tarefa" });
        }
    }

    async getAllTasks(req, res) {
        try{
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks);
        }catch(error){
            console.error("Erro ao buscar tarefas: ", error);
            res.status(500).json({ error: "Erro ao buscar tarefas" });
        }
    }

    async getTaskById(req, res) {
        const { id } = req.params;

        try{
            const task = await taskService.getTaskById(id);
            res.status(200).json(task);
        }catch(error){
            console.error("Erro ao buscar tarefa: ", error);
            res.status(500).json({ error: "Erro ao buscar tarefa" });
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;

        try{
            const deletedTask = await taskService.deleteTask(id);
            res.status(200).json(deletedTask);
        }catch(error){
            console.error("Erro ao deletar tarefa: ", error);
            res.status(500).json({ error: "Erro ao deletar tarefa" });
        }
    }

    async updateTask(req, res) {
        const { id, description, completed, deadline, category, priority } = req.body;

        try{
            const updatedTask = await taskService.updateTask(id, description, completed, deadline, category, priority);
            res.status(200).json(updatedTask);
        }catch(error){
            console.error("Erro ao atualizar tarefa: ", error);
            res.status(500).json({ error: "Erro ao atualizar tarefa" });
        }
    }
}

module.exports = new TaskController();