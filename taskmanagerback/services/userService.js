//services/userService.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserService {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    async createUser(name, email, pass) {
        const password = this.hashPassword(pass);
        return User.create({ name, email, password });
    }

    async getUserByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async getAllUsers() {
        return User.findAll();
    }

    async deleteUser(email, password) {
        return User.destroy({ where: { email, password } });
    }

    async updateUser(email, name, password, newEmail) {
        return User.update({ email: newEmail, name, password }, { where: { email } });
    }
}

module.exports = new UserService();