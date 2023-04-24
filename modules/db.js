const { get } = require('mongoose');
const mongo = require('./database/mongo.js')
function createUser(name,username,email,password) {
    mongo.createUser(name,username,email,password);
}
async function existsAccount(username) {
    if(await mongo.findUser(username)) {
        return true;
    }
    else {return false;}
}
async function getAccount(username) {
    var acc = await mongo.findUser(username)
    if(acc) {
        console.log(acc)
        return acc;
    }
    else {return false;}
}

module.exports.getAccount = getAccount;
module.exports.existsAccount = existsAccount;
module.exports.createUser = createUser;