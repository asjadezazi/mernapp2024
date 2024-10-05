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
router.route("/products/update/:id").put(isAuthenticated, updateProduct);
router.route("/products/delete/:id").delete(isAuthenticated, deleteProduct);
router.route("/products/:id").get( getProduct);

module.exports = router;
