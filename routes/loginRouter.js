import express from 'express'
import loginMdw from '../middlewares/loginMdw';

const loginRouter = express.Router()

loginRouter.post('/', loginMdw)

export default loginRouter