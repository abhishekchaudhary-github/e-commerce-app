const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const register = async (req, res) => {
    //first registered user as admin
    const role = 'user'
    (await User.countDocuments({})) === 0 ? role = 'admin' : role = 'user'
    const {name,email,password} = req.body //role ignored
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({name,email,password,role})
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