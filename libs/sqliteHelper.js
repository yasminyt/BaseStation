import Database from 'better-sqlite3'
import fs from 'fs'

const db = new Database('./test.db')

db.prepare('PRAGMA foreign_keys = ON').run()

/**
 * Query one record 
 * When execution completes it returns an object that represents the first row retrieved by the query.
 * The object's keys represent column names.
 * If the statement was successful but found no data, undefined is returned.
 * @param {string} sql 
 */
const get = sql => db.prepare(sql).get()

/**
 * query all records
 * The return value is an array of row objects.
 * If no rows are found, the array will be empty.
 * @param {string} sql 
 */
const getAll = sql => db.prepare(sql).all()

/** insert records */
const insert = sql => dbRun(sql)
/** delete records */
const remove = sql => dbRun(sql)
/** update records */
const update = sql => dbRun(sql)

/**
 * .run()
 * Executes the prepared statement. 
 * When execution completes it returns an info object describing any changes made. 
 * The info object has two properties:
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
const dbRun = sql => {
  try {
    return db.prepare(sql).run()
  } catch(e) {
    console.log(e)
    return false
  }
}

// execute the sql file
const readSqlFile = () => {
  const migration = fs.readFileSync('./sqlite/cvDB.sql', 'utf8')
  db.exec(migration)
}

const CRUD = {
  insert: insert,
  get: get,
  getAll: getAll,
  delete: remove,
  update: update
}

export { db, CRUD }
