const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    checkDelete: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('User', userSchema);