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
const create = name => {
  const sql = `insert into task_item (name) values('${name}')`
  return CRUD.insert(sql)
}

/**
 * Get all task items' records
 */
const getAll = () => {
  const sql = 'select * from task_item'
  return CRUD.getAll(sql)
}

/**
 * Query a task item record by name
 * @param {string} name 
 */
const getByName = name => {
  const sql = `select * from task_item where name='${name}'`
  return CRUD.get(sql)
}

/**
 * count all task item records
 */
const countAll = () => {
  const sql = 'select count(item_id) as taskItemNums from task_item'
  return CRUD.count(sql)['taskItemNums']
}

const taskItemModel = {
  create,
  getAll,
  getByName,
  countAll
}

export { TaskItem, taskItemModel }