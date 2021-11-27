const bCrypt = require('bcryptjs')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken')


    const register = async (req, res, next) => {
        const { uname, email, password, role } = req.body;

        try{
            const emailExists = await userModel.findOne({ email: email }).lean()
        if (emailExists) {
            res.status(400).json({
                error: true,
                message: 'Email already exists',
                data: null
            })
        } else {
            const saltRounds = 10;
            // salting
            const salt = await bCrypt.genSalt(saltRounds);
            console.log(salt);
            // hashing 
            const hashedPassword = await bCrypt.hash(password, salt)
            console.log(hashedPassword);
            await userModel.insertMany([{
                uname,email, role, password:hashedPassword
            }])
            res.status(200).json({
                error :false,
                message :' User Registered Successfully',
                data : null
            })
        } 
        }catch(err) {
            next(err)
        }
    };


    const login = async (req, res, next) => {
        const {email, password} = req.body;
        try {
            const userData = await userModel.findOne({email}).lean()
            if (userData) {
                const {uname, role} = userData;
                const isPasswordMatch = await bCrypt.compare(password, userData.password) 
                if (isPasswordMatch) {
                    const payload = { fname, lname, role }
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn : '10h'
                    })
                    res.status(200).json({
                        error : false, 
                        message : 'Login Successfull', 
                        // data : {fname : userData.fname, lname: userData.lname}
                        data : {fname, lname, role, token}
                    })
                } else {
                    res.status(401).json({
                        error : true,
                        message : 'Invalid Password',
                        data : null
                    })
                }
            } else {
                res.status(400).json({
                    error : true,
                    message : "Email doesnt exist. Please register",
                    data : null
                })
            }
        } catch(err) {
            next(err)
        }
    }



module.exports = {register, login}