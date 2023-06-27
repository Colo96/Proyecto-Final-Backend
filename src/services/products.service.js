const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateProductErrorInfo } = require("./errors/info.error");

const { productsDAO, businessesDAO } = getDAOS();

class ProductsService {
  async generateProducts(total) {
    if (!total || isNaN(total)) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const generatedProducts = await productsDAO.generateProducts(total);
    if (!Array.isArray(generatedProducts) || !generatedProducts.length) {
      throw new HttpError(
        "Products array is not valid",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return generatedProducts;
  }

  async getProducts(filter = {}) {
    const products = await productsDAO.getProducts(filter);
    return products;
  }

  async getProductById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const product = await productsDAO.getProductById(id);
    if (!product) {
      throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    return product;
  }

  async createProduct(product) {
    const { title, price, stock, thumbnail_url, description, business } =
      product;
    if (
      !title ||
      !price ||
      isNaN(price) ||
      !stock ||
      isNaN(stock) ||
      !thumbnail_url ||
      !description ||
      !business
    ) {
      throw new HttpError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (
      typeof title !== "string" ||
      typeof price !== "number" ||
      typeof stock !== "number" ||
      typeof thumbnail_url !== "string" ||
      typeof description !== "string" ||
      typeof business !== "string"
    ) {
      throw new HttpError(
        generateProductErrorInfo(product),
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const businessDB = await businessesDAO.getBusinessById(business);
    if (!businessDB) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }
    const newProductPayload = {
      title,
      price,
      stock,
      thumbnail_url,
      description,
      business: businessDB,
    };
    const newProduct = await productsDAO.createProduct(newProductPayload);
    return newProduct;
  }

  async updateProductById(id, product) {
    const { title, price, stock, thumbnail_url, description, business } =
      product;
    if (
      !title ||
      !price ||
      isNaN(price) ||
      !stock ||
      isNaN(stock) ||
      !thumbnail_url ||
      !description ||
      !business
    ) {
      throw new HttpError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const businessDB = await businessesDAO.getBusinessById(business);
    if (!businessDB) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }
    const updatedProduct = await productsDAO.updateProductById(id, product);
    return updatedProduct;
  }

  async deleteProductById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const deletedProduct = await productsDAO.deleteProductById(id);
    return deletedProduct;
  }

  async deleteProducts() {
    const deletedProducts = await productsDAO.deleteProducts();
    return deletedProducts;
  }
}

module.exports = ProductsService;
