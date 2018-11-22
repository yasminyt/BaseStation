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
  for (let i = 1; i < datas.length; i++) {
    const rowData = datas[i]
    if (rowData.length) 
      if (checkDate(rowData[2])) {
        let job = new Job(null, createdUser, createdTime, rowData[2], null, null, rowData[1], rowData[0])
        if (!ifExists(job)) 
          jobModel.create(job)
        else
          insertErr.push(rowData)
      } else
        deadlineErr.push(rowData)
    else
      break
  }
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
  jobModel.queryJob(job.userId, job.towerCode, job.inspectionDate, row => {
    if (row) return true
    return false
  })
}


export { addJobs }