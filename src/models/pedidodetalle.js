'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PedidoDetalle.init({
    pedidoId: DataTypes.INTEGER,
    platilloId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL,
    contieneExtra: DataTypes.BOOLEAN,
    subTotal: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PedidoDetalle',
  });
  return PedidoDetalle;
};