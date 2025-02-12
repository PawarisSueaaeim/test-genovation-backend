const product = require("../model/product")

exports.getProduct = async (request, response) => {
    try {
        const id = request.params.id
        const res = await product.findOne({ _id: id }).exec()
        response.send(res)
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.getAllProduct = async (request, response) => {
    try {
        const res = await product.find({})
        response.send(res)
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.createProduct = async (request, response) => {
    try {
        console.log(request.body)
        const producted = await product(request.body).save()
        response.send(producted)
    } catch (error) {
        console.log(error)
    }
}

exports.updateProduct = async (request, response) => {
    try {
        const id = await request.params.id
        const res = await product
            .findOneAndUpdate({ _id: id }, request.body, { new: true })
            .exec()
        response.send(res)
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error")
    }
}

exports.deleteProduct = async (request, response) => {
    try {
        const id = await request.params.id
        const res = await product.findOneAndDelete({ _id: id }).exec()
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
