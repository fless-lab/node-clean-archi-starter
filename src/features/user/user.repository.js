const User = require('../../core/entities/user.entity');
const UserModel = require('../../frameworks/database/sequelize/models/user.model');

class UserRepository {
    async findAll() {
        console.log("in get all users repo")

        const users = await UserModel.findAll();
        console.log("in get all users repo 2 : ",users)

        return users.map(user => new User(user.dataValues));
    }

    async findById(id) {
        const user = await UserModel.findByPk(id);
        return user ? new User(user.dataValues) : null;
    }

    async create(userData) {
        const user = await UserModel.create(userData);
        return new User(user.dataValues);
    }

    async update(id, userData) {
        const [updateCount, updatedUsers] = await UserModel.update(userData, {
            where: { id },
            returning: true
        });
        return updateCount > 0 ? new User(updatedUsers[0].dataValues) : null;
    }

    async delete(id) {
        return await UserModel.destroy({ where: { id } });
    }
}

module.exports = UserRepository;
