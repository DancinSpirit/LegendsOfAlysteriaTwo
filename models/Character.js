const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        firstName: {type: String},
        lastName: {type: String}
    },
    {timestamps: true}
)

const Character = mongoose.model("Character", schema);

module.exports = Character;