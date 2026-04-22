'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailRecieve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailRecieve.init({
    codeemail: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmailRecieve',
  });
  return EmailRecieve;
};