'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KYCRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      documentType: {
        type: Sequelize.STRING
      },
      documentData: {
        type: Sequelize.JSON
      },
      requestTimestamp: {
        type: Sequelize.DATE
      },
      requestStatus: {
        type: Sequelize.STRING
      },
      responseData: {
        type: Sequelize.JSON
      },
      responseTimestamp: {
        type: Sequelize.DATE
      },
      apiStatus: {
        type: Sequelize.STRING
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      domainId: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KYCRequests');
  }
};