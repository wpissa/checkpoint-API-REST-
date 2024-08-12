const mongoose = require ('mongoose')
const {
Schema, model
} = mongoose
const userModel = new Schema({
    nom: String,
    email: String
})
module.exports = model('User', userModel)
