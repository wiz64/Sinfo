var users = [];
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
        users[this.username] = this;
    }
};

class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        }
    verify() {
        console.log(`Verifying Login for ${this.username}`)
        if(!users[this.username]) {
            console.log(`${this.username} doesn't exist`);
            return(403);
        } else {
            console.log(`${this.username} exists`);
            // todo : hash compare passwords
            if(this.password == users[this.username].password) {
                console.log("Password matched, creating token")
            } else {console.log(`Failed login attempt : ${this.username}`)}
        }
    }
};

module.exports.User = User;
module.exports.Login = Login;
