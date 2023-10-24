const jwt = require('jsonwebtoken')

const createJwt = ({payload}) => {
    const token = jwt.sign(payload,'jwtSecret',{expiresIn:'id'})
    return token
}

const isTokenValid = ({token}) => {
    return jwt.verify(token,'jwtsecret')
}

module.exports = {
    createJwt,
    isTokenValid
}