import express from 'express'
import { uploadTask } from '../middlewares/taskMdw';

const taskRouter = express.Router()

/** For App */
taskRouter.post('/upload', uploadTask)

export default taskRouter