import { CRUD, db } from '../libs/sqliteHelper'

class Shot {
  constructor(shotId, photoPath, createdTime, output, taskId) {
    this._shotId = shotId
    this._photoPath = photoPath
    this._createdTime = createdTime
    this._output = output
    this._taskId = taskId
  }
  get shotId() { return this._shotId }
  get photoPath() { return this._photoPath }
  get createdTime() { return this._createdTime }
  get output() { return this._output }
  get taskId() { return this._taskId }
}


/**
 * insert a new shot record
 * @param {object} shot 
 * @param {function} callback 
 */
const create = shot => {
  const sql = `insert into shot values(null, '${shot.photoPath}', '${shot.createdTime}', ` +
              `'${shot.output}', ${shot.taskId})`
  return CRUD.insert(sql)
}

const prepareInsert = () => {
  const sql = 'insert into shot values(null, ?, ?, ?, ?)'
  return db.prepare(sql)
}

const runInsert = (db, shot) => db.run(shot.photoPath, shot.createdTime, shot.output, shot.taskId)

const getShot = taskId => {
  const sql = `select * from shot where task_id=${taskId}`
  return CRUD.get(sql)
}

const shotModel = {
  create,
  prepareInsert,
  runInsert,
  getShot
}

export { Shot, shotModel }