import { CRUD, db } from '../libs/sqliteHelper'

class Shot {
  constructor(photoPath, createdTime, output, taskId) {
    this._photoPath = photoPath
    this._createdTime = createdTime
    this._output = output
    this._taskId = taskId
  }
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

const shotModel = {
  create,
  prepareInsert,
  runInsert
}

export { Shot, shotModel }