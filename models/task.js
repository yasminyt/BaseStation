import { CRUD } from '../libs/sqliteHelper'

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

const taskModel = {
  addTask: addTask
}

export { Task, taskModel }