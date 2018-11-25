import base64 from 'base-64'
import { userModel } from '../models/user'
import { jobModel } from '../models/job'
import { taskItemModel } from '../models/taskItem';

export default function loginCtrl(tel, password) {
  return verify(tel, password)
}

/**
 * verify user by tel and password
 * @param {string} tel 
 * @param {string} password 
 * @param {function} callback 
 */
const verify = (tel, password) => {
  const user = userModel.getUser(tel)
  if (user) {
    // judge the user is whether disabled
    if (user.disabled) 
      return {status: false, value: 'disabled user'}
    else {
      const encode = base64.encode(password)
      if (encode === user.password) {
        if (user.role === 'admin')
          return {status: true, value: 'admin'}
        else 
          return getJobs(tel)
      } 
      else
        return {status: false, value: 'wrong password'}
    }
  } else
    return { status: false, value: 'invalid user'}
}

/**
 * get valid user's unfinished jobs 
 * @param {string} tel 
 */
const getJobs = tel => {
  const jobs = jobModel.getUserJobs(tel)
  if (jobs.length) {
    const taskItems = taskItemModel.getAll()
    return {status: true, value: { jobs: jobs, taskItems: taskItems }}
  } else
    return {status: true, value: 'no records'}
}