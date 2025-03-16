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
        const data = await request.body;
        const hasDoctor = await doctor.findOne({ name: data.name })
        if (!hasDoctor) {
            const created = await doctor(request.body).save()
            response.send(created)
        }else{
            response.send("แพย์ท่านนี้มีิยู่แล้ว");
        }
    } catch (error) {
        console.log(error)
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