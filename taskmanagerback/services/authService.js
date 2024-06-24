//services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();

class AuthService{

    async login(email, password){
        const user = await User.findOne({ where: { email } });
        try{
            if(!user){
                throw new Error("Usuário não encontrado");
            }

            if(!await bcrypt.compare(password, user.password)){
                throw new Error("Senha inválida");
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return token;
        }catch(error){
            throw new Error("Erro ao realizar login: " + error);
        }
    }
}

module.exports = new AuthService();