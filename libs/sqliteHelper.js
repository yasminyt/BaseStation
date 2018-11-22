const sqlite3 = require('sqlite3')
const db = new  sqlite3.Database('./test.db')

/**
 * create new record
 * @param {string} sql 
 * @param {function} callback 
 */
const insert = (sql, callback) => {
  db.run(sql, function (error) {
      if (error) {
        console.log(error)
        callback(false)
      }
      else callback(true)
    }
  )
}

/**
 * query one record 
 * @param {string} sql 
 * @param {function} callback 
 */
const get = (sql, callback) => {
  db.get(sql, (error, row) => {
    if (error)  console.log(error)
    else callback(row)    // row is an object, and its key is the name of the data that defined in database
  })
}

/**
 * query all records
 * @param {string} sql 
 * @param {function} callback 
 */
const getAll = (sql, callback) => {
  db.all(sql, (error, rows) => {
    if (error)  console.log(error)
    else  callback(rows)    // rows is an array, and its elements are object
  })
}

/** delete records */
const remove = callback => {
  db.run("delete from user", 
    function (error) {
      if (error)  console.log(error)
      else callback(this.lastID)
    }
  )
}

const readSqlFile = () => {
  // 怎么写 sql 文件路径？？？？/
}

const CRUD = {
  insert: insert,
  get: get,
  getAll: getAll,
  delete: remove
}

export { db, CRUD }
