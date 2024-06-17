const UserUseCases = require('../../core/use_cases/user.usecases');
const PasswordService = require('./password.service');



class UserService {
    constructor() {
        this.userUseCases = new UserUseCases();
    }

    async getAllUsers() {
        console.log("in get all users services")
        return await this.userUseCases.getAllUsers();
    }

    async getUserById(id) {
        return await this.userUseCases.getUserById(id);
    }

    async createUser(userData) {
        userData.password = await PasswordService.hashPassword(userData.password);
        return await this.userUseCases.createUser(userData);
    }

    async updateUser(id, userData) {
        if (userData.password) {
            userData.password = await PasswordService.hashPassword(userData.password);
        }
        return await this.userUseCases.updateUser(id, userData);
    }

    async deleteUser(id) {
        // Logique métier avant la suppression
        return await this.userUseCases.deleteUser(id);
    }
}

module.exports = UserService;
