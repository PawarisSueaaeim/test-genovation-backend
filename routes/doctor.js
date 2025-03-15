const express = require("express");
const auth = require("../model/auth");
const {
    getAllDoctor,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctor");

const router = express.Router();

router.get("/getAllDoctors", auth, getAllDoctor);

router.get("/getDoctor/:id", auth, getDoctor);

router.post("/createDoctor", auth, createDoctor);

router.put("/updateDoctor", auth, updateDoctor);

router.delete("/deleteDoctor/:id", auth, deleteDoctor);

module.exports = router;
