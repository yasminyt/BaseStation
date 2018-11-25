import sqlite3 from 'sqlite3'
import sqliteSync from 'sqlite-sync'

const db = new sqlite3.Database('./test.db')
sqliteSync.connect('./test.db')

// db.run('PRAGMA foreign_keys = ON', function (err) {
//   console.log(err)
//   console.log('db2')
// })

// sqliteSync.run('PRAGMA foreign_keys = ON', function(err) {
//   console.log(err)
//   console.log('sqlitesync2')
// })


/**
 * create new record
 * @param {string} sql 
 * @param {function} callback 
 */
const insert = (sql, callback) => {
  db.run(sql, function (error) {
    if (error && callback) {
      console.log(error)
      callback(false)
    }
    else if (callback) callback(true)
  }
  )
}

/**
 * Synchronous creating a new record
 * @param {string} sql 
 */
const insertSync = sql => sqliteSync.run(sql)

/**
 * query one record 
 * @param {string} sql 
 * @param {function} callback 
 */
const get = (sql, callback) => {
  db.get(sql, (error, row) => {
    if (error) console.log(error)
    else callback(row)    // row is an object, and its key is the name of the data that defined in database
  })
}

/**
 * Synchronous quering one record
 * @param {string} sql 
 */
const getSync = sql => sqliteSync.run(sql)

/**
 * query all records
 * @param {string} sql 
 * @param {function} callback 
 */
const getAll = (sql, callback) => {
  db.all(sql, (error, rows) => {
    if (error) console.log(error)
    else callback(rows)    // rows is an array, and its elements are object
  })
}

/** delete records */
const remove = callback => {
  db.run("delete from user",
    function (error) {
      if (error) console.log(error)
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
  delete: remove,
  insertSync: insertSync,
  getSync: getSync
}

export { db, CRUD }
