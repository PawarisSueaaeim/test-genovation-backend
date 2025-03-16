const doctor = require("../model/doctor")

exports.getDoctor = async (request, response) => {
    try {
        const id = request.params.id
        const res = await doctor.findOne({ _id: id }).exec()
        response.send(res)
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.getAllDoctor = async (request, response) => {
    try {
        const res = await doctor.find({})
        response.send(res)
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.createDoctor = async (request, response) => {
    try {
        const data = request.body;
        const hasDoctor = await doctor.findOne({ name: new RegExp(`^${data.name}$`, "i") });

        if (!hasDoctor) {
            const created = await new doctor(data).save();
            response.status(200).send(created);
        } else {
            response.status(400).send("แพทย์ท่านนี้มีอยู่แล้ว");
        }
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.updateDoctor = async (request, response) => {
    try {
        const id = await request.params.id
        const res = await doctor
            .findOneAndUpdate({ _id: id }, request.body, { new: true })
            .exec()
        response.send(res)
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.deleteDoctor = async (request, response) => {
    try {
        const id = await request.params.id
        const res = await doctor.findOneAndDelete({ _id: id }).exec()
        response.send(res)
    } catch (error) {
        console.log(error)
        response.send({
            status: 500,
            error: error,
            client_message: "เกิดข้อผิดพลาด",
        })
    }
}