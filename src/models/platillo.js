'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Platillo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Platillo.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    tipoplatilloId: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Platillo',
  });
  return Platillo;
};