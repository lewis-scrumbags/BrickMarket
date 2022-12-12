const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
    title: {type: String},
    },{collection: "elements"}
)

const model1 = mongoose.model("ElementSchema", ElementSchema)

module.exports = model1