const bcrypt = require('bcrypt');
let users = require('./database');

let idCount = 0;
const addToDatabase = async (email, password) => {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    users.push({"id" : ++idCount, "email" : email , "password" : password});
};

const userExists = (email) => {
    const foundUsers = users.filter((user) => {
        return email === user.email;
    });

    if (foundUsers.length > 0){
        return true;
    } else {
        return false;
    }
};

const authenticatedUser = async (email, password) => { //returns boolean

//if username and password match the one we have in records.
    const boolArray = await Promise.all(users.map(async (user) => {
        //returns true if hashed user.password == password logged in

        const auth = await bcrypt.compare(password, user.password);

        if (auth == true) {
            console.log("auth = true");
            if (user.email === email) {
                console.log("emails match");
                return true;
            } else {
                console.log("emails not matching");
                return false;
            }
        } else {
            console.log("auth = false");
            return false;
        }
    }));

    const foundUsers = users.filter((user, index) => boolArray[index]);
    console.log(foundUsers[0]);
    return foundUsers[0];

};



module.exports = {addToDatabase, userExists, authenticatedUser};