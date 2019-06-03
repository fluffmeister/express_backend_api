const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   blizzId: String
 }, {
   timestamps: true
 });


module.exports = mongoose.model('user', userSchema);
