const auth = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctor = require("../model/doctor");
const special = require("../model/special");

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
                        _id: user._id,
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
                            id: user._id,
                            isAdmin: user.isAdmin,
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

exports.book = async (request, response) => {
    try {
        const id = request.params.id;
        const dataBook = await request.body;

        const user = await auth.findById(id);
        const doctorData = await doctor.findById(dataBook.doctorId);
        if (!doctorData) {
            response.status(404).send("Document not found");
        } else {
            const timeSlotObject = doctorData.timeSlot.find(
                (item) => item.id === Number(dataBook.timeSelected)
            );
            if (!timeSlotObject) {
                response.status(404).send("Time slot not found");
                return;
            } else {
                const updatedTimeSlotObject = {
                    id: timeSlotObject.id,
                    date: timeSlotObject.date,
                    start: timeSlotObject.start,
                    end: timeSlotObject.end,
                    doctor: doctorData.name,
                    doctor_id: doctorData._id,
                    special: doctorData.special
                };
                user.booking.push(updatedTimeSlotObject);
                await user.save();

                doctorData.timeSlot = doctorData.timeSlot.filter(
                    (slot) => slot.id !== timeSlotObject.id
                );
                await doctorData.save();

                response.status(200).send("Updated document successfully");
            }
        }
    } catch (error) {
        console.log(error);
        response.status(500).send("server error");
    }
};

exports.getBooking = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await auth.findById(id);
        if (!user) {
            response.status(404).send("User not found");
        } else {
            response.status(200).send(user.booking);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send("server error");
    }
}

exports.deleteBooking = async (request, response) => {
    try {
        const userId = request.params.userId;
        const bookingId = Number(request.params.bookingId);
        const doctorId = request.params.doctorId;
        const bookingData = request.body;

        const user = await auth.findById(userId);
        if (!user) {
            response.status(404).send("User not found");
            return;
        }

        const bookingIndex = user.booking.findIndex(
            (item) => item.id === bookingId
        );

        if (bookingIndex === -1) {
            response.status(404).send("Booking not found");
            return;
        }

        user.booking.splice(bookingIndex, 1);
        await user.save();

        const doctorData = await doctor.findById(doctorId);
        if (!doctorData) {
            response.status(404).send("Doctor not found");
            return;
        }else{
            doctorData.timeSlot.push({
                date: bookingData.date,
                start: bookingData.start,
                end: bookingData.end,
                id: bookingId,
            })
            await doctorData.save();
        }

        response.status(200).send("Deleted booking successfully");
    } catch (error) {
        console.log(error);
        response.status(500).send("server error");
    }
};
