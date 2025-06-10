const mongoose = require('mongoose');

const signupModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "visitor"],
        required: true,
    },
});

module.exports = mongoose.model("User", signupModel);