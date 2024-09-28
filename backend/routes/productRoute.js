const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controller/productController");

const router = express.Router();

router.route("/products/find").get(getAllProducts);
router.route("/products/create").post(createProduct);
router.route("/products/update/:id").put(updateProduct);
router.route("/products/delete/:id").delete(deleteProduct);
router.route("/products/:id").get(getProduct);

module.exports = router;
