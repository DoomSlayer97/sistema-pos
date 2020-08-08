'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING(30)
    },
    lastname: {
      type: DataTypes.STRING(30)
    },
    email: {
      type: DataTypes.STRING(30)
    },
    surname: {
      type: DataTypes.STRING(30)
    },
    password: {
      type: DataTypes.STRING(200)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};