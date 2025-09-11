'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Promocions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      urlImage: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      platilloId: {
        type: Sequelize.INTEGER
      },
      fechaInicio: {
        type: Sequelize.DATEONLY
      },
      fechaFinal: {
        type: Sequelize.DATEONLY
      },
      estado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Promocions');
  }
};