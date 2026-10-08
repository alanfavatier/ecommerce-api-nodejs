const { Model, DataTypes } = require("sequelize");

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isBlock: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_block",
  },
};

class Product extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
