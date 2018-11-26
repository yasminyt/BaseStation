import { CRUD } from '../libs/sqliteHelper'
import { currentDay } from '../libs/util'

class Job {
  constructor(jobId, createdUser, createdTime, inspectionDate, completed, abnormal, process, userId, towerCode) {
    this._jobId = jobId
    this._createdUser = createdUser
    this._createdTime = createdTime
    this._inspectionDate = inspectionDate
    this._completed = completed
    this._abnormal = abnormal
    this._process = process
    this._userId = userId
    this._towerCode = towerCode
  }
  get createdUser() { return this._createdUser }
  get createdTime() { return this._createdTime }
  get inspectionDate() { return this._inspectionDate }
  get process() { return this._process }
  get userId() { return this._userId }
  get towerCode() { return this._towerCode }
}

/**
 * insert a new job record into table
 * @param {object} job 
 */
const create = job => {
  const sql = `insert into job (created_user, created_time, inspection_date, process, user_id, tower_code) values` +
              `('${job.createdUser}', '${job.createdTime}', '${job.inspectionDate}', '${job.process}', '${job.userId}', '${job.towerCode}')`
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

/**
 * query job records by combining some conditions
 * @param {string} userId 
 * @param {number} towerCode 
 * @param {string} inspectionDate 
 * @param {number} completed 
 * @param {number} abnormal 
 */
const combinedQuery = (userId, towerCode, inspectionDate, completed, abnormal) => {
  let sql = 'select job_id jobId, inspection_date inspectionDate, user.tel userId, user.name userName, tower.code towerCode, ' +
            'tower.name towerName, process from job, tower, user where user_id = user.tel and tower_code=tower.code'
  if (userId)
    sql += ` and user_id='${userId}'`
  if (towerCode)
    sql += ` and tower_code=${towerCode}`
  if (inspectionDate)
    sql += ` and inspection_date='${inspectionDate}'`
  if (completed !== null)
    sql += ` and completed=${completed}`
  if (abnormal !==null)
    sql += ` and abnormal=${abnormal}`
  return CRUD.getAll(sql)
}

/**
 * update a job record about completed and abnormal
 * @param {number} jobId 
 * @param {number} completed 
 * @param {number} abnormal 
 * @param {string} process
 */
const updateStatus = (jobId, completed, abnormal, process) => {
  const sql = `update job set completed=${completed}, abnormal=${abnormal}, process='${process}' where jobId=${jobId}`
  return CRUD.update(sql)
}

/**
 * count jobs by some conditions
 * @param {string} options [undefined | 'completed=1' | 'compeleted=0' | 'abnormal=1']
 * @param {string} timeLimit [week | month | year]
 */
const countJobs = (options, timeLimit) => {
  let sql = 'select count(job_id) as jobsNum from job where true'
  if (options)
    sql += ` and ${options}`
  switch(timeLimit) {
    case 'week': 
      /** 最近七天 */
      sql += " and inspection_date between date('now', 'start of day', '-6 day') and date('now')"
      break
    case 'month':
      /** 最近一个月（按30天） */
      sql += " and inspection_date between date('now', 'start of day', '-30 day') and date('now')"
      break
    case 'year':
      /** 最近一年 */
      sql += " and inspection_date between date('now', 'start of month', '-12 month') and date('now')"
    break
    default: break
  }
  return CRUD.get(sql)['jobsNum']
}

/**
 * Count the job records by combining some conditions
 * @param {string} userId 
 * @param {number} towerCode 
 * @param {string} inspectionDate 
 * @param {string} options ['completed=1' | 'abnormal=1']
 */
const combinedCount = (userId, towerCode, inspectionDate, options) => {
  let sql = `select count(job_id) as count from job where ${options}`
  if (userId)
    sql += ` and user_id='${userId}'`
  if (towerCode)
    sql += ` and tower_code=${towerCode}`
  if (inspectionDate)
    sql += ` and inspection_date='${inspectionDate}'`
  return CRUD.get(sql)['count']
}


const jobModel = {
  create,
  getUserJobs,
  queryJob,
  combinedQuery,
  updateStatus,
  countJobs,
  combinedCount
}

export { Job, jobModel }