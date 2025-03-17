const special = require("../model/special");

exports.getSpecial = async (request, response) => {
    try {
        const res = await special.find({});
        response.send(res);
    } catch (error) {
        console.log(error)
        response.status(500).send("Server error");
    }
};