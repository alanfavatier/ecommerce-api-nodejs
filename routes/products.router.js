const express = require("express");

const ProductsService = require("../services/product.service");

const validatorHandler = require("../middlewares/validator.handler");

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require("../schemas/product.schema");

const router = express.Router();

const service = new ProductsService();

// GET /api/v1/products
router.get("/", async (req, res, next) => {
  try {
    const products = await service.find();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/products/filter
router.get("/filter", (req, res) => {
  res.send("Hola bro soy tu nueva ruta");
});

// GET /api/v1/products/:id
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

// POST /api/v1/products
router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newProduct = await service.create(body);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

// PATCH /api/v1/products/:id
router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /api/v1/products/:id
router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const rta = await service.delete(id);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
