const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {attactCookiesToResponse} = require('../utils/index')

const register = async (req, res) => {
    //first registered user as admin
    const role = 'user'
    (await User.countDocuments({})) === 0 ? role = 'admin' : role = 'user'
    const {name,email,password} = req.body //role ignored
    const user = await User.create(req.body)
    const tokenUser= {name:user.name,userId:user._id}
    attactCookiesToResponse(res,tokenUser)
    // const token = createJwt({payload:tokenUser})
    // res.cookie('token',token, {
    //     httpOnly:true,
    //     expires:new Date(Date.now()+1000*60*60*24)
    // })
    res.status(StatusCodes.CREATED).json({tokenUser,token})
}

const login = async (req, res) => {
    const {email,password} = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
      }
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
      }
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
      }
      const tokenUser= {name:user.name,userId:user._id}
      attactCookiesToResponse(res,tokenUser)
      res.status(StatusCodes.CREATED).json({tokenUser,token})
}

const logout = async (req, res) => {
    res.cookie('token','randomevalue',{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg:'logged out!'})
}

module.exports = {
    register,login,logout
}