const jwt = require('jsonwebtoken')

const authorizeUserAdmin = (req, res, next) => {
    console.log(req.headers['authorization']);
    console.log(req.headers);
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        if (payload === 'user' || payload === 'admin') {
            next()
        } else {
            res.status(401).json({
                error : true,
                message : 'Not Authorized',
                data : null
            })
        }
    } else {
        res.status(401).json({
            error : true,
            message : 'Not Authorized',
            data : null
        })
    }
}


const authorizeAdmin = (req, res, next) => {
    if(req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1]
    const payload = jwt.verify(token, process.env.SEXRET_KEY)
    if (payload === 'admin') {
        next()
    } else {
        res.status(401).json({
            error : true,
            message : 'Not Authorized',
            data : null
        })
    }
} else {
    res.status(401).json({
        error : true,
        message : 'Not Authorized',
        data : null
    })
}
}

module.exports = {authorizeUserAdmin, authorizeAdmin}