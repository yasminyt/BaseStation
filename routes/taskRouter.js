import express from 'express'
import { uploadTask, getDetailTask } from '../middlewares/taskMdw';

const taskRouter = express.Router()

/** For App */
taskRouter.post('/upload', uploadTask)

taskRouter.get('/detailTask/:jobId', getDetailTask)

export default taskRouter