const product = require('../models/products')

const getAllMovies = async (req, res, next) => {
    try{
        const products = await product.find().lean();
        res.json({
            error:false,
            message:"",
            data:products
        });
    } catch(err) {
        // res.json({
        //     error:true,
        //     message:err.message,
        //     data:null
        // });
        next(err)   // for add products
    }
}

// add product
const addMovie = async (req, res, next) => {
    const {mImage,mName, mRating,mDirector,mStarring} = req.body;
    try{
        await product.insertMany([{
            mImage,mName, mRating,mDirector,mStarring      
          }])
        res.json({
            error : false,
            message : 'Movies  added Successfully',
            data : null
        })
    } catch(err) {
        console.log(err);
        next(err)    // it will pass to error handling middleware
    }
}

// edit product
const editMovie = async (req, res, next) => {
    const {_id,mImage,mName, mRating,mDirector,mStarring} = req.body;
    try{
        await product.updateOne({
           _id
        },{
            $set : {
                mImage,mName, mRating,mDirector,mStarring
            }
        })
        res.json({
            error : false,
            message : 'movie updated Successfully',
            data : {_id, mImage,mName, mRating,mDirector,mStarring}
        })
    } catch(err) {
        next(err)    // it will pass to error handling middleware
    }
}


// delete product
const deleteMovie = async (req, res, next) => {
    const {_id} = req.body;
    try{
        await product.deleteOne({
           _id
        })
        res.json({
            error : false,
            message : 'movie deleted Successfully',
            data : null
        })
    } catch(err) {
        next(err)    // it will pass to error handling middleware
    }
}



module.exports = { getAllMovies, addMovie, editMovie, deleteMovie }