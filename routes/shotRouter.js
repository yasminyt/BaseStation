import express from 'express'
import { queryShotMsg, getImg } from '../middlewares/shotMdw';

const shotRouter = express.Router()

/** get shot message by taskId */
shotRouter.get('/:taskId', queryShotMsg)

/** get photo */
shotRouter.get('/getImg/:imgName', getImg)

export default shotRouter