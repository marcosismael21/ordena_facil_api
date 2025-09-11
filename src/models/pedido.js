'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido.init({
    numeroOrden: DataTypes.STRING,
    clienteId: DataTypes.INTEGER,
    colaboradorId: DataTypes.INTEGER,
    mesaId: DataTypes.INTEGER,
    tipoPedidoId: DataTypes.INTEGER,
    direccionId: DataTypes.INTEGER,
    fechaCompra: DataTypes.DATEONLY,
    subtotal: DataTypes.DECIMAL,
    impuesto: DataTypes.DECIMAL,
    descuento: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    estadoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};