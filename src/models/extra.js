'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Extra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Extra.init({
    pedidoDetalleId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.DECIMAL,
    precioUnitario: DataTypes.DECIMAL,
    subtotal: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Extra',
  });
  return Extra;
};