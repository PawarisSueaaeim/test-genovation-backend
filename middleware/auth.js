const jwt = require("jsonwebtoken");

exports.auth = async (request, response, next) => {
    try {
        const authHeader = request.headers["authorization"];
        if (!authHeader) {
            return response.status(401).send("Invalid authorization");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return response.status(401).send("Invalid token format");
        }

        // ตรวจสอบ token
        const decoded = jwt.verify(token, "jwtsecret");
        console.log(decoded);

        next();
    } catch (error) {
        response.status(401).send("Token is invalid");
    }
};