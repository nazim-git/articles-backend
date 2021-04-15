const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let employee = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: false },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    role: { type: String, require: true },
    gender: { type: String, require: true },
    joining_date: { type: Date, default: new Date() },
}, { collection: 'employee' });

module.exports = mongoose.model('Employee', employee);