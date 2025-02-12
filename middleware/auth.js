const jwt = require("jsonwebtoken");

exports.auth = async (request, response, next) => {
    try {
        const token = await request.headers["authorization"];
        if (!token) {
            return response.status(401).send("Invalid authorization");
        }else{
            const decode = jwt.verify(token, 'jwtsecret')
            next();
        }
    } catch (error) {
        console.log(error);
        response.status(401).send("Token is invalid");
    }
};