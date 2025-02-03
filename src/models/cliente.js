'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cliente.init({
    nombres: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    usuario: DataTypes.STRING,
    clave: DataTypes.STRING,
    fechaVerificacionC: DataTypes.DATEONLY,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};