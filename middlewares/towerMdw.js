import { Tower } from '../models/tower'
import { createTower } from '../controllers/towerCtrl';

const create = (req, res) => {
  const { code, name, address, lat, lng, type } = req.body
  const tower = new Tower(code, name, address, lat, lng, type)
  createTower(tower, status => {
    if (status)
      res.send('success')
    else
      res.status(403).send('该记录已存在，不可以再重复添加！')
  })
}

export { create }