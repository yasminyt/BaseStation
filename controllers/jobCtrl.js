import { getTime, currentDateAndTime, currentDay } from "../libs/util";
import { Job, jobModel } from "../models/job";
import { taskItemModel } from "../models/taskItem";

const regex = /-/g
const createdDate = currentDay()

/**
 * Add the jobs from the excel into the job table
 * @param {array} datas 
 */
const addJobs = (datas, createdUser) => {
  const createdTime = currentDateAndTime()
  const process = `0/${taskItemModel.countAll()}`
  
  let repeatErr = [], insertErr = [], deadlineErr = []
  datas.forEach(item => {
    if (checkDate(item[2])) {
      let job = new Job(null, createdUser, createdTime, item[2], null, null, process, item[1], item[0])
      if (!ifExists(job)) {
        let result = jobModel.create(job)
        if (!result)
          insertErr.push(item)
      }
      else
        repeatErr.push(item)
    } else
      deadlineErr.push(item)
  })

  return {repeatErr, insertErr, deadlineErr}
}

const updateJobStatus = (jobId, completedNum, abnormal) => {
  let completed = 0
  const taskNum = taskItemModel.countAll()
  if (completedNum === taskNum)
    completed = 1
  return jobModel.updateStatus(jobId, completed, abnormal, `${completedNum}/${taskNum}`)
}

/**
 * Count job records by abnormal and completed values, or add some time limits
 * @param {string} timeLimit ['week' | 'month' default | 'year']
 */
const countJobMsg = (timeLimit='month') => {
  const jobsNum = jobModel.countJobs()                      // 统计所有的job
  const abnormalNum = jobModel.countJobs('abnormal=1')      // 统计所有异常的job
  const completedNum = jobModel.countJobs('completed=1')    // 统计所有完成的job
  const uncompletedNum = jobModel.countJobs('completed=0')  // 统计所有未完成的job
  /** 按任务时间统计 */
  const jobsNumByTime = jobModel.countJobs(null, timeLimit)
  const abnormalNumByTime = jobModel.countJobs('abnormal=1', timeLimit)
  const completedNumByTime = jobModel.countJobs('completed=1', timeLimit)    
  const uncompletedNumByTime = jobModel.countJobs('completed=0', timeLimit)

  return {
    countTotal: {jobsNum, abnormalNum, completedNum, uncompletedNum},
    countByTime: {jobsNumByTime, abnormalNumByTime, completedNumByTime, uncompletedNumByTime}
  }
}

const doCombinedQuery = (userId, towerCode, inspectionDate, completed, abnormal) => {
  const rows = jobModel.combinedQuery(userId, towerCode, inspectionDate, completed, abnormal) 
  const completedNum = jobModel.combinedCount(userId, towerCode, inspectionDate, 'completed=1')
  const abnormalNum = jobModel.combinedCount(userId, towerCode, inspectionDate, 'abnormal=1')
  return {datas: rows, completedNum, abnormalNum}
}

/**
 * Compare the inspection date with the created date
 * @param {string} inspectionDate 
 */
function checkDate(inspectionDate) {
  if (regex.test(inspectionDate))
    inspectionDate = inspectionDate.replace(regex, '/')
  
  return getTime(inspectionDate) >= getTime(createdDate)
}

/**
 * Check whether the job table already has the record
 * @param {object} job 
 */
function ifExists(job) {
  const row = jobModel.queryJob(job.userId, job.towerCode, job.inspectionDate)
  return (row ? true : false)
}


export { addJobs, updateJobStatus, countJobMsg, doCombinedQuery }