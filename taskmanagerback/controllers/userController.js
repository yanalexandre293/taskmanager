//controller/userController.js
const userService = require('../services/userService');

class UserController {
    async createUser(req, res) {
        const { name, email, password } = req.body;
        try{
            const newUser = await userService.createUser(name, email, password);
            res.status(201).json(newUser);
        }catch(error){
            console.error("Erro ao criar usuário: ", error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }

    async getUserByEmail(req, res) {
        const { email } = req.params;
        
        try{
            const user = await userService.getUserByEmail(email);
            res.status(200).json(user);
        }catch(error){
            console.error("Erro ao buscar usuário: ", error);
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async getAllUsers(req, res) {
        try{
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        }catch(error){
            console.error("Erro ao buscar todos os usuários: ", error);
            res.status(500).json({ error: "Erro ao buscar todos os usuários" });
        }
    }

    async deleteUser(req, res) {
        const { email, password } = req.body;

        try{
            const deletedUser = await userService.deleteUser(email, password);
            res.status(200).json(deletedUser);
        }catch(error){
            console.error("Erro ao deletar usuário: ", error);
            res.status(500).json({ error: "Erro ao deletar usuário" });
        }
    }

    async updateUser(req, res) {
        const { email, name, password, newEmail } = req.body;

        try{
            const updatedUser = await userService.updateUser(email, name, password, newEmail);
            res.status(200).json(updatedUser);
        }catch(error){
            console.error("Erro ao atualizar usuário: ", error);
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }
}

module.exports = new UserController();