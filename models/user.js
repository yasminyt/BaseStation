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
 */
const create = user => {
  const encodedPwd = base64.encode(user.password)
  const sql = `insert into user values('${user.tel}', '${encodedPwd}', 0, ` +
              `'${user.name}', '${user.sex}', '${user.age}', ${user.role?"'manager'":null})`
  return CRUD.insert(sql)
}

/**
 * Query a user's message by tel
 * @param {string} tel 
 */
const getUser = tel => {
  const sql = `select * from user where tel='${tel}'`
  return CRUD.get(sql)
}

/**
 * Query all users' message except the manager
 */
const getAll = () => {
  const sql = 'select tel, disabled, name, sex, age from user where role is null'
  return CRUD.getAll(sql)
}

/**
 * Delete a user's record by tel
 * @param {string} tel 
 */
const remove = tel => {
  const sql = `delete from user where tel = '${tel}'`
  return CRUD.delete(sql)
}

/**
 * Disable or not a user
 * @param {string} tel 
 * @param {number} isDisable 
 */
const disable = (tel, isDisable) => {
  const sql = `update user set disabled=${isDisable} where tel='${tel}'`
  return CRUD.update(sql)
}

const userModel = {
  create,
  getUser,
  getAll,
  delete: remove,
  disable
}

export { User, userModel }
