import { towerModel } from '../models/tower'

/**
 * A controller used to create a new tower record
 * @param {object} tower 
 */
const createTower = tower => towerModel.create(tower)

export { createTower }