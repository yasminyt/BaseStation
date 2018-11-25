import { getTime, currentDateAndTime, currentDay } from "../libs/util";
import { Job, jobModel } from "../models/job";

const regex = /-/g
const createdDate = currentDay()

/**
 * Add the jobs from the excel into the job table
 * @param {array} datas 
 */
const addJobs = (datas, createdUser) => {
  const createdTime = currentDateAndTime()
  
  let repeatErr = [], insertErr = [], deadlineErr = []
  datas.forEach(item => {
    if (checkDate(item[2])) {
      let job = new Job(null, createdUser, createdTime, item[2], null, null, item[1], item[0])
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


export { addJobs }