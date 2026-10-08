const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

class ProductsService {
  async create(data) {
    const newProduct = await sequelize.models.Product.create(data);
    return newProduct;
  }

  async find() {
    const data = await sequelize.models.Product.findAll();
    return data;
  }

  async findOne(id) {
    const product = await sequelize.models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("product is block");
    }
    return product;
  }

  async update(id, changes) {
    const product = await sequelize.models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    await product.update(changes);
    return product;
  }

  async delete(id) {
    const product = await sequelize.models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
