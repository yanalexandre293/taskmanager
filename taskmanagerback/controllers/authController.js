//controllers/authController.js
const authService = require('../services/authService');

class AuthController{

    async login(req, res) {
        const { email, password } = req.body;
        try{
            const token = await authService.login(email, password);
            res.status(200).json({ token });
        }catch(error){
            console.error("Erro ao realizar login: ", error);
            res.status(500).json({ error: "Erro ao realizar login" });
        }
    }
}

module.exports = new AuthController()