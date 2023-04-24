var users = [];
const db = require('./db.js');
class User {
    constructor(name,username,email,password) {
        // sanitize and take it
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        }
    register() {
        console.log(`Registering New User \n name : ${this.name} \n username : ${this.username} \n email : ${this.email} \n password_hashlength : ${this.password.length} \n `);
        // todo : store hashed
        db.createUser(this.name,this.username,this.email,this.password);
    }
};

class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        }
    async verify() {
        console.log(`Verifying Login for ${this.username}`)
        if(! await db.existsAccount(this.username)) {
            console.log(`${this.username} doesn't exist`);
            return false;
        } else {
            console.log(`${this.username} exists`);
            // todo : hash compare passwords
            var password_hash = (await db.getAccount(this.username)).password;
            if(this.password == password_hash) {
                console.log("Password matched, creating token")
            } else {console.log(`Failed login attempt : ${this.username}`)}
        }
    }
};

module.exports.User = User;
module.exports.Login = Login;
