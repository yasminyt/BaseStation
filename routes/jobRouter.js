import express from 'express'
import { saveFile, readFile } from '../middlewares/jobMdw';

const jobRouter = express.Router()

jobRouter.post('/upload', saveFile, readFile)

export default jobRouter