import express from 'express'
import { create, getAll } from '../middlewares/userMdw';

const userRouter = express.Router()

// get all users' message
userRouter.get('/', getAll)

// create a new user
userRouter.post('/create', create)

// delete a user
userRouter.delete('/:tel', )

export default userRouter