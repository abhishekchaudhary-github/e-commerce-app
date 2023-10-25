const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/index')
const {isTokenValid} = require('../utils/jwt')

const authentication = async(req,res,next) => {
    const token = req.signedCookies.token

    if(!token) {
        throw new CustomError.UnauthenticatedError('Invalid request')
    }
    
    try{
        const { name,userId,role } = await isTokenValid(token)
        req.user = { name,userId,role }
        next()
    }
    catch(err){
        throw new CustomError.UnauthenticatedError('Invalid request')
    }
}

module.exports = {
    authentication
}