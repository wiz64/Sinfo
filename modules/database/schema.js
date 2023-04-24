var mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
    name: String,
    username : String,
    email : String,
    password : String
    
});

module.exports.UsersSchema = UsersSchema;