const express = require("express");
const { register, login, book, getBooking, deleteBooking } = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/book/:id", auth, book);
router.get("/getBooking/:id", auth, getBooking);
router.delete("/deleteBooking/:userId/:bookingId", auth, deleteBooking);


module.exports = router;
