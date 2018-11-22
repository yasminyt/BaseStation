import base64 from 'base-64'
import { userModel } from '../models/user'
import { jobModel } from '../models/job'

export default function loginCtrl(tel, password, callback) {
  verify(tel, password, (status, value) => callback(status, value))
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
          getJobs(tel, callback)
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