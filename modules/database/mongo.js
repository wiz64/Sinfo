// getting-started.js
const mongoose = require('mongoose');
const config  = require('../../config.js');
var schema = require('./schema.js')
const user = mongoose.model('user', schema.UsersSchema);

async function createUser(name,username,email,password) {
    await mongoose.connect(config.mongo_url);
    const account = new user({name,username,email,password});
    if(await user.findOne({ $or:[{username:{$regex: username}},{email:{$regex: username}}] })) {
        console.log(username," - account exists, can't create new..")
    } else {
    console.log(username," - creating account")
    await account.save();
    }
}
async function findUser(username) {
    await mongoose.connect(config.mongo_url);
    return await user.findOne({ $or:[{username:{$regex: username}},{email:{$regex: username}}] });
}
module.exports.createUser = createUser;
module.exports.findUser = findUser;