const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controller/productController");
const isAuthenticated = require("../middleware/authentication")

const router = express.Router();

router.route("/products/find").get(getAllProducts);
router.route("/products/create").post(createProduct);
router.route("/products/update/:id").put(updateProduct);
router.route("/products/delete/:id").delete(deleteProduct);
router.route("/products/:id").get(isAuthenticated, getProduct);

module.exports = router;
