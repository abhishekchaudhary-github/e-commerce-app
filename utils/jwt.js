const jwt = require('jsonwebtoken')

const createJwt = ({payload}) => {
    const token = jwt.sign(payload,'jwtSecret',{expiresIn:'1d'})
    return token
}

const isTokenValid = ({token}) => {
    return jwt.verify(token,'jwtsecret')
}

const attactCookiesToResponse = ({res,user}) =>{
    const token = createJwt({payload:user})
    res.cookie('token',token, {
        httpOnly:true,
        expires:new Date(Date.now()+1000*60*60*24),
        secured:process.env.NODE_ENV==='production',
        signed:true
    })
}

module.exports = {
    createJwt,
    isTokenValid,
    attactCookiesToResponse
}