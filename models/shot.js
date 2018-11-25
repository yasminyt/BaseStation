import { CRUD } from '../libs/sqliteHelper'

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

const shotModel = {
  create: create
}

export { Shot, shotModel }