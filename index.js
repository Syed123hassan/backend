const express = require('express')
const cors = require('cors')
require('dotenv').config();

// db connection
require('./conifg/db.js')

// product routes
const productRoutes = require('./routes/movies')

// user routes
const userRoutes = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 4000;

app.use(cors())
// body parser middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// route middleware
app.use('/products', productRoutes)
app.use('/users', userRoutes)


app.get('/test', (req,res) => {
    res.json({'test':'test the rest service'})
})

// error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        error : true,
        message : err.message,
        data : null
    })
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

// to access the data from the .env file we use process.env.parameter