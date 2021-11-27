const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema ({
    mImage : {
        type : String,
        required : true,
        minlength:3,
        maxlength:10000
    },
    mName : {
        type : String,
        required : true,
        minlength:4,
        maxlength:100
    },
    mRating : {
        type : Number,
        required : true ,
        min : 0,
        max : 10,
    },
    mDirector : {
        type : String,
        required : true ,
        min : 0,
        max : 10,
    },
    mStarring : {
        type : String,
        required : true ,
        min : 0,
        max : 10,
    },
    
})


module.exports = mongoose.model('movies', productSchema)