import { verifyToken } from "../libs/jwt";


export default function auth(req, res, next) {
  const token = req.headers.authorization
  if (token) {
    const result = verifyToken(token)
    if (result.status) {
      req.decoded = result.decoded
      next()
    } else 
      res.status(403).send(result)
  } else
    res.status(403).json({status: false, message: 'No token provided'})
}