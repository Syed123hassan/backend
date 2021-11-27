const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uname : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 100
    },
    email : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 100
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 100
    },
    role : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
   
})

module.exports = mongoose.model('users', userSchema)