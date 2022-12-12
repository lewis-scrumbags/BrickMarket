const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
    itemID: {type: String},
    deisgnID: {type: String},
    description: {type: String},
    color: {type: String},
    colorID: {type: String},
    quantity: {type: String},
    },{collection: "elements"}
)

const model1 = mongoose.model("ElementSchema", ElementSchema)

module.exports = model1