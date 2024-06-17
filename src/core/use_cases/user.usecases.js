const UserRepository = require('../../features/user/user.repository');

class UserUseCases {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers() {
        console.log("in get all users usecase")

        return await this.userRepository.findAll();
    }

    async getUserById(id) {
        return await this.userRepository.findById(id);
    }

    async createUser(userData) {
        return await this.userRepository.create(userData);
    }

    async updateUser(id, userData) {
        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id) {
        return await this.userRepository.delete(id);
    }
}

module.exports = UserUseCases;
