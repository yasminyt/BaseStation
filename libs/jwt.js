import jwt from 'jsonwebtoken'
import config from '../configs/config'

/**
 * generate a token for first loging
 * @param {object} payload 
 */
const generateToken = payload => {
  const expiresInMinutes = {
    expiresIn: 1440   // token过期时间（分钟）
  }
  return jwt.sign(payload, config.secret, expiresInMinutes)
}

/**
 * verify the token
 * @param {string} token 
 */
const verifyToken = token => {
  try {
    const decoded = jwt.verify(token, config.secret)
    return { status: true, decoded: decoded}
  } catch(err) {
    console.log(err)
    return { status: false, message: 'Failed to authenticate token.'}
  }
}

export { generateToken, verifyToken }