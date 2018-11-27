import express from 'express'
import { saveFile, readFile, combinedQuery } from '../middlewares/jobMdw';

const jobRouter = express.Router()

/** upload job excel file */
jobRouter.post('/upload', saveFile, readFile)
/** combined query job records */
jobRouter.get('/combinedQuery', combinedQuery)

export default jobRouter