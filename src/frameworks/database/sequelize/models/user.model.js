const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class User extends Model {}

User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING 
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
