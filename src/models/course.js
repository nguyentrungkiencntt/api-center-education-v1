'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Course.init({
    codecourse: DataTypes.STRING,
    coursename: DataTypes.STRING,
    price: DataTypes.STRING,
    shortdescription: DataTypes.TEXT,
    detaildescription: DataTypes.TEXT,
    target: DataTypes.TEXT,
    benefits: DataTypes.TEXT,
    image: DataTypes.TEXT,
    rating: DataTypes.STRING,
    codecategory: DataTypes.STRING,
    codeinstructor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};