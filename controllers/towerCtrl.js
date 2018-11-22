import { towerModel } from '../models/tower'

/**
 * A controller used to create a new tower record
 * @param {object} tower 
 * @param {function} callback 
 */
const createTower = (tower, callback) => {
  towerModel.create(tower, callback)
}

export { createTower }