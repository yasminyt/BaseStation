import express from 'express'
import { getAllItems, createTaskItems } from '../middlewares/taskItemMdw';


const taskItemRouter = express.Router()

taskItemRouter.get('/', getAllItems)

taskItemRouter.post('/create', createTaskItems)

export default taskItemRouter