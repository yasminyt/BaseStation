import { CRUD, db } from '../libs/sqliteHelper'

class Task {
  constructor(completed, abnormal, output, completedTime, lat, lng, jobId, itemId) {
    this._completed = completed
    this._abnormal = abnormal
    this._output = output
    this._completedTime = completedTime
    this._lat = lat
    this._lng = lng
    this._jobId = jobId
    this._itemId = itemId
  }
  get completed() { return this._completed }
  get abnormal() { return this._abnormal }
  get output() { return this._output }
  get completedTime() { return this._completedTime }
  get lat() { return this._lat }
  get lng() { return this._lng }
  get jobId() { return this._jobId }
  get itemId() { return this._itemId }
}

/**
 * add a new task record
 * @param {object} task 
 */
const addTask = task => {
  const sql = `insert into task values(null, ${task.completed}, ${task.abnormal}, '${task.output}', `+
              `'${task.completedTime}', '${task.lat}', '${task.lng}', ${task.jobId}, ${task.itemId})`
  
  // because the task_id is auto increment, it's value is the same as the lastId
  return CRUD.insert(sql)
}

const prepareInsert = () => {
  const sql = 'insert into task values(null, ?, ?, ?, ?, ?, ?, ?, ?)'
  return db.prepare(sql)
}

const runInsert = (db, task) => {
  try {
    const result = db.run(task.completed, task.abnormal, task.output, task.completedTime, task.lat, task.lng, task.jobId, task.itemId)
    return result
  } catch(e) {
    console.log(e)
    return false
  }
}

const getByJobId = jobId => {
  const sql = 'select task_id taskId, completed, abnormal, output, completed_time completedTime, lat, lng, ' +
              `task_item.name itemName from task, task_item where job_id=${jobId} and task.item_id=task_item.item_id`
  return CRUD.getAll(sql)
}

/**
 * Get all abnormal tasks from view by combining conditions
 * @param {string} startDate 
 * @param {string} endDate 
 * @param {string} userId 
 * @param {number} towerId 
 * @param {number} itemId 
 */
const getAbnormalTask = (startDate, endDate, userId, towerId, itemId) => {
  let sql = 'select * from abnormalView where true'
  if (startDate)
    sql += ` and inspectionDate >= '${startDate}'`
  if (endDate)
    sql += ` and inspectionDate <= '${endDate}'`
  if (userId)
    sql += ` and userId='${userId}'`
  if (towerCode)
    sql += ` and towerId=${towerId}`
  if (itemId)
    sql += ` and itemId=${itemId}`
  return CRUD.getAll(sql)
}

const taskModel = {
  addTask,
  prepareInsert,
  runInsert,
  getByJobId,
  getAbnormalTask
}

export { Task, taskModel }