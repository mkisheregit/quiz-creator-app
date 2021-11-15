const mongoose = require('mongoose');

// ** save users anwers in array of string
const responseSchema = mongoose.Schema({
    responses: [String]
});

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;