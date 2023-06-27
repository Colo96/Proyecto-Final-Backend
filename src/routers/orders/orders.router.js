const { Router } = require("express");
const OrdersController = require("../../controllers/orders.controller");
const passportCustom = require("../../middleware/passport.middleware");

const router = Router();

router.get("/", OrdersController.getOrders); //si
router.get("/:oid", OrdersController.getOrderById); //si
router.post("/", OrdersController.createOrder); //si
router.post("/:oid/products", OrdersController.addProductToOrder);
router.post("/mockingorders/:total", OrdersController.generateOrders); //si
router.put("/:oid", OrdersController.updateOrderById); //si
router.delete("/", OrdersController.deleteOrders);
router.delete("/:oid", OrdersController.deleteOrderById); //si
router.delete("/:oid/products", OrdersController.deleteProductToOrder);

module.exports = router;
