import express from 'express'
import { create, getAll, remove, disable, unlock } from '../middlewares/userMdw';

const userRouter = express.Router()

// get all users' message
userRouter.get('/', getAll)

// create a new user
userRouter.post('/create', create)

// delete a user
userRouter.delete('/:tel', remove)

// disable a user
userRouter.put('/disable/:tel', disable)

// unlock a user
userRouter.put('/unlock/:tel', unlock)

export default userRouter