import base64 from 'base-64'
import { CRUD } from '../libs/sqliteHelper'

class User {
  constructor(tel, password, disabled, name, sex, age, role) {
    this._tel = tel
    this._password = password
    this._disabled = disabled
    this._name = name
    this._sex = sex
    this._age = age
    this._role = role
  }
  get tel()  {  return this._tel   }
  get password() {  return this._password  }
  get disabled() {  return this._disabled  }
  get name() {  return this._name  }
  get sex()  {  return this._sex   }
  get age()  {  return this._age   }
  get role() {  return this._role  }
}

/**
 * Insert a new user record into the user table
 * @param {object} user 
 * @param {function} callback 
 */
const create = (user, callback) => {
  const encodedPwd = base64.encode(user.password)
  const sql = `insert into user values('${user.tel}', '${encodedPwd}', 0, ` +
              `'${user.name}', '${user.sex}', '${user.age}', ${user.role?"'manager'":null})`
  CRUD.insert(sql, callback)
}

/**
 * Query a user's message by tel
 * @param {string} tel 
 * @param {function} callback 
 */
const getUser = (tel, callback) => {
  const sql = `select * from user where tel='${tel}'`
  CRUD.get(sql, row => {
    if (row) {
      const user = new User(row.tel, row.password, row.disabled, row.name, row.sex, row.age, row.role)
      callback(user)
    } else 
      callback(undefined)
  })
}

/**
 * Query all users' message except the manager
 * @param {function} callback 
 */
const getAll = callback => {
  const sql = 'select tel, disabled, name, sex, age from user where role is null'
  CRUD.getAll(sql, callback)
}

/**
 * Delete one or more users' message from the table
 * @param {array} telArr 
 * @param {function} callback 
 */
const remove = (telArr, callback) => {
  const sql = `delete from user where tel in ${telArr}`
  CRUD.delete(sql, callback)
}

const userModel = {
  create: create,
  getUser: getUser,
  getAll: getAll
}

export { User, userModel }
