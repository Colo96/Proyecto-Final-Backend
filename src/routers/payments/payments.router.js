const { Router } = require("express");
const PaymentsController = require("../../controllers/payments.controller");

const router = Router();

router.post("/create-checkout-session", PaymentsController.createSession);

module.exports = router;
