import { CRUD } from '../libs/sqliteHelper'

class TaskItem {
  constructor(itemId, name) {
    this._itemId = itemId
    this._name = name
  }
  get itemId() { return this._itemId }
  get name()   { return this._name }
}

/**
 * Create a new task item record with name
 * @param {string} name 
 */
const createSync = name => {
  const sql = `insert into task_item (name) values('${name}')`
  CRUD.insertSync(sql)
}

/**
 * Get all task items' records
 * @param {function} callback 
 */
const getAll = callback => {
  const sql = 'select * from task_item'
  CRUD.getAll(sql, callback)
}

/**
 * Query a task item record by name
 * @param {string} name 
 * @param {function} callback 
 */
const getByNameSync = name => {
  const sql = `select * from task_item where name='${name}'`
  return CRUD.getSync(sql)
}

const taskItemModel = {
  createSync: createSync,
  getAll: getAll,
  getByNameSync: getByNameSync
}

export { TaskItem, taskItemModel }