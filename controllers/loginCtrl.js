import base64 from 'base-64'
import { userModel } from '../models/user'
import { jobModel } from '../models/job'
import { taskItemModel } from '../models/taskItem';

export default function loginCtrl(tel, password, callback) {
  verify(tel, password, callback)
}

/**
 * verify user by tel and password
 * @param {string} tel 
 * @param {string} password 
 * @param {function} callback 
 */
const verify = (tel, password, callback) => {
  userModel.getUser(tel, user => {
    if (user) {
      const encode = base64.encode(password)
      if (encode === user.password) {
        if (user.role === 'admin')
          callback(true, 'admin')
        else
          getJobs(tel, (status, value) => {
            if (typeof value !== 'string') 
              getTaskItems(taskItems => callback(true, {jobs: value, taskItems: taskItems}))
            else 
              callback(status, value)
          })
      }
      else
        callback(false, 'wrong password')
    } else
      callback(false, 'invalid user')
  })
}

/**
 * get valid user's unfinished jobs 
 * @param {string} tel 
 * @param {function} callback 
 */
const getJobs = (tel, callback) => {
  jobModel.getUserJobs(tel, rows => {
    if (rows.length) callback(true, rows)
    else  callback(true, 'no records')
  })
}

const getTaskItems = callback => taskItemModel.getAll(callback)