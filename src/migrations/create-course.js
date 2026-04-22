'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codecourse: {
        type: Sequelize.STRING
      },
      coursename: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      shortdescription: {
        type: Sequelize.TEXT
      },
      detaildescription: {
        type: Sequelize.TEXT
      },
      target: {
        type: Sequelize.TEXT
      },
      benefits: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.STRING
      },
      codecategory: {
        type: Sequelize.STRING
      },
      codeinstructor: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};