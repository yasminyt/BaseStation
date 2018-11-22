import express from 'express'
import { create } from '../middlewares/towerMdw'

const towerRouter = express.Router()

towerRouter.post('/create', create)

export default towerRouter