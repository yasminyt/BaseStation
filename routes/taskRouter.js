import express from 'express'
import { uploadTask, getDetailTask, getAbnormalTask } from '../middlewares/taskMdw';

const taskRouter = express.Router()

/** For App */
// upload task request
taskRouter.post('/upload', uploadTask)

// query detail task request
taskRouter.get('/detailTask/:jobId', getDetailTask)
// query abnormal task request
taskRouter.get('/abnormalTask', getAbnormalTask)

export default taskRouter