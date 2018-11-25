import { Tower } from '../models/tower'
import { createTower } from '../controllers/towerCtrl';
import response from '../libs/response';

const create = (req, res) => {
  const { code, name, address, lat, lng, type } = req.body
  const tower = new Tower(code, name, address, lat, lng, type)
  const result = createTower(tower)
  response.cudRes(result, res)
}

export { create }