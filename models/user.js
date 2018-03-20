const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');
var bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username : {type: String ,unique: true},
    fullname : {type: String ,unique: true ,default : ''},
    email : {type: String  ,unique: true},
    password : {type: String ,default: ''},
    userImage : {type: String , default : 'default.png'},
    facebook : {type: String ,default : ''},
    fbTokens : Array,
    google : {type: String ,default : ''},
    googleTokens : Array
});

// generating a hash
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
