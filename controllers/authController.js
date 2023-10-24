const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {createJwt} = require('../utils/index')

const register = async (req, res) => {
    //first registered user as admin
    const role = 'user'
    (await User.countDocuments({})) === 0 ? role = 'admin' : role = 'user'
    const {name,email,password} = req.body //role ignored
    const user = await User.create(req.body)
    const tokenUser= {name:user.name,userId:user._id}
    const token = createJwt({payload:tokenUser})
    res.cookie('token',token, {
        httpOnly:true,
        expires:new Date(Date.now()+1000*60*60*24)
    })
    res.status(StatusCodes.CREATED).json({tokenUser,token})
}

const login = async (req, res) => {
    res.send('...')
}

const logout = async (req, res) => {
    res.send('...')
}

module.exports = {
    register,login,logout
}