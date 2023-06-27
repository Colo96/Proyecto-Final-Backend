const { Router } = require("express");
const passportCustom = require("../../middleware/passport.middleware");
const getSERVICES = require("../../services/index.service");

const router = Router();

const { productsService, ordersService } = getSERVICES();

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/profile", passportCustom("jwt"), async (req, res) => {
  const user = req.user;
  res.render("profile", { user });
});

router.get("/products", async (req, res) => {
  const products = await productsService.getProducts();
  res.render("product", { products });
});

router.get("/cart", async (req, res) => {
  const orders = await ordersService.getOrders();
  res.render("cart", { orders });
});

module.exports = router;
