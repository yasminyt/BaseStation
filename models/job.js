import { CRUD } from '../libs/sqliteHelper'
import { currentDay } from '../libs/util'

class Job {
  constructor(jobId, createdUser, createdTime, inspectionDate, completed, abnormal, userId, towerCode) {
    this._jobId = jobId
    this._createdUser = createdUser
    this._createdTime = createdTime
    this._inspectionDate = inspectionDate
    this._completed = completed
    this._abnormal = abnormal
    this._userId = userId
    this._towerCode = towerCode
  }
  get createdUser() { return this._createdUser }
  get createdTime() { return this._createdTime }
  get inspectionDate() { return this._inspectionDate }
  get userId() { return this._userId }
  get towerCode() { return this._towerCode }
}

/**
 * insert a new job record into table
 * @param {object} job 
 */
const create = job => {
  const sql = `insert into job (created_user, created_time, inspection_date, user_id, tower_code) values` +
              `('${job.createdUser}', '${job.createdTime}', '${job.inspectionDate}', '${job.userId}', '${job.towerCode}')`
  return CRUD.insert(sql)
}

/**
 * get a user's current jobs that aren't completed by user_id
 * @param {string} userId 
 */
const getUserJobs = userId => {
  const sql = 'select job_id jobId, tower_code towerCode, tower.name towerName from job join tower ' +
              `where user_id='${userId}' and inspection_date='${currentDay()}' ` +
              'and completed=0 and job.tower_code=tower.code'
  return CRUD.getAll(sql)
}

/**
 * query a job record by userId, towerCode and inspectionDate
 * @param {string} userId 
 * @param {string} towerCode 
 * @param {string} inspectionDate 
 */
const queryJob = (userId, towerCode, inspectionDate) => {
  const sql = `select * from job where user_id='${userId}' and tower_code='${towerCode}' and inspection_date='${inspectionDate}'`
  return CRUD.get(sql)
}


const jobModel = {
  create: create,
  getUserJobs: getUserJobs,
  queryJob: queryJob
}

export { Job, jobModel }