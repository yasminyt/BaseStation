import { getTime, currentDateAndTime, currentDay } from "../libs/util";
import { Job, jobModel } from "../models/job";

const regex = /-/g
const createdDate = currentDay()

/**
 * Add the jobs from the excel into the job table
 * @param {array} datas 
 * @param {function} callback 
 */
const addJobs = (datas, createdUser, callback) => {
  const createdTime = currentDateAndTime()
  
  let insertErr = [], deadlineErr = []
  // todo 整个循环都要修改，因为这里有异步的操作，所以整个程序的执行顺序不是按顺序的！！！
  datas.forEach(item => {
    if (checkDate(item[2])) {
      let job = new Job(null, createdUser, createdTime, item[2], null, null, item[1], item[0])
      if (!ifExists(job))
        jobModel.create(job)
      else
        insertErr.push(item)
    } else
      deadlineErr.push(item)
  })

  callback(insertErr, deadlineErr)
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
  return jobModel.queryJob(job.userId, job.towerCode, job.inspectionDate)
}


export { addJobs }