'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto.init({
    descripcion: DataTypes.STRING,
    proveedorId: DataTypes.INTEGER,
    tipoMedidaId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER,
    cantidad: DataTypes.DECIMAL,
    codigo: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};