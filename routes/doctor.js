const express = require("express");
const {
    getAllDoctor,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctor");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/getAllDoctors", auth, getAllDoctor);

router.get("/getDoctor/:id", auth, getDoctor);

router.post("/createDoctor", auth, createDoctor);

router.put("/updateDoctor", auth, updateDoctor);

router.delete("/deleteDoctor/:id", auth, deleteDoctor);

module.exports = router;
