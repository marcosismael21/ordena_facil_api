'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroOrden: {
        type: Sequelize.STRING
      },
      clienteId: {
        type: Sequelize.INTEGER
      },
      colaboradorId: {
        type: Sequelize.INTEGER
      },
      ipoPedidoId: {
        type: Sequelize.INTEGER
      },
      direccionId: {
        type: Sequelize.INTEGER
      },
      fechaCompra: {
        type: Sequelize.DATEONLY
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      impuesto: {
        type: Sequelize.DECIMAL
      },
      descuento: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      estadoId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Pedidos');
  }
};