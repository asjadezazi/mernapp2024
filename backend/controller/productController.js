const Product = require("../models/productModel");
const trycatchError = require("../middleware/trycatchError");
const CatchError = require("../resources/catcherror");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  if (product) {
    res.status(201).json({
      success: true,
      product,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Product creation failed",
    });
  }
};

exports.updateProduct = trycatchError(async (req, res) => {
  const updateData = req.body;
  // Update the product by ID
  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Product successfully deleted',
//       product,
//     });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };

exports.deleteProduct = trycatchError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
    Product,
  });
});

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };

exports.getAllProducts = trycatchError(async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CatchError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};
