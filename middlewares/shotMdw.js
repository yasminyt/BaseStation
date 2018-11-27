import { getShotMsg } from '../controllers/shotCtrl';

const queryShotMsg = (req, res) => {
  const { taskId } = req.params
  const data = getShotMsg(taskId)
  res.send(data)
}

const getImg = (req, res) => {
  const { imgName } = req.params
  res.sendFile(`${__dirname}/public/img/${imgName}`)
}

export { queryShotMsg, getImg }