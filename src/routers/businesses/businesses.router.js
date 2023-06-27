const { Router } = require("express");
const BusinessesController = require("../../controllers/businesses.controller");

const router = Router();

router.get("/", BusinessesController.getBusinesses);
router.get("/:bid", BusinessesController.getBusinessById);
router.post("/", BusinessesController.createBusiness);
router.post("/:bid/products", BusinessesController.addProductToBusiness);
router.post(
  "/mockingbusinesses/:total",
  BusinessesController.generateBusinesses
);
router.put("/:bid", BusinessesController.updateBusinessById);
router.delete("/", BusinessesController.deleteBusinesses);
router.delete("/:bid", BusinessesController.deleteBusinessById);
router.delete("/:bid/products", BusinessesController.deleteProductToBusiness);

module.exports = router;
