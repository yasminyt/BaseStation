import express from 'express'
import { getShot } from '../middlewares/shotMdw';

const shotRouter = express.Router()

shotRouter.get('/', getShot)

export default shotRouter