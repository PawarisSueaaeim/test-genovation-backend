const brands = require('../model/vehicles');
exports.getBrands = async (_, response) => {
    try {
        const data = await brands.find({});
        response.send(data);
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error: " + error);
    }
};