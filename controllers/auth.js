const auth = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (request, response) => {
    try {
        const data = await request.body;
        const username = await auth.findOne({ username: data.username });
        if (!username) {
            // Encrypt
            var password_bcrypted = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(data.password, password_bcrypted);

            await auth({
                username: data.username,
                password: hash,
                isAdmin: false,
            }).save();
            response.status(200).send("created successfully");
        } else {
            response.status(400).send("User already registered");
        }
    } catch (error) {
        console.log(error);
        response.status(500).send("server error");
    }
};

exports.login = async (request, response) => {
    try {
        const data = await request.body;
        const user = await auth.findOneAndUpdate(
            { username: data.username },
            { new: true }
        );
        if (user) {
            const isMatch = await bcrypt.compare(data.password, user.password);
            if (isMatch) {
                const payload = {
                    auth: {
                        isAdmin: user.isAdmin,
                        username: user.username,
                    },
                };
                jwt.sign(
                    payload,
                    "jwtsecret",
                    { expiresIn: 20000 },
                    (error, token) => {
                        if (error) {
                            throw error;
                        }
                        response.json({
                            token,
                            isAdmin: user.isAdmin,
                            test: "test",
                            username: user.username,
                        });
                    }
                );
            } else {
                response.status(401).send("Invalid password");
            }
        } else {
            response.status(401).send("Invalid User");
        }
    } catch (error) {
        console.log(error);
        response.status(500).send("server error");
    }
};
