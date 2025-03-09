const express = require("express");
const {
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    createProduct,
} = require("../controllers/product");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/product/:id", auth, getProduct);

router.get("/product", getAllProduct);

router.post("/product", auth, createProduct);

router.put("/product/:id", auth, updateProduct);

router.delete("/product/:id", auth, deleteProduct);

module.exports = router;
