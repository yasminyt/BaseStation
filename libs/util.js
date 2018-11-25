import fs from 'fs'

const currentDay = () => {
  const time = new Date()
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`
}

const currentDateAndTime = () => {
  const time = new Date()
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ` +
         `${time.getHours()}:${(time.getMinutes() < 10) ? '0' : '' + time.getMinutes()}`
}

const getTime = date => {
  const d = new Date(date)
  return d.getTime()
}

/**
 * Rename the upload file and return the new path
 * @param {string} tempPath 
 * @param {string} folder 
 * @param {string} fileName 
 */
const renameFile = (tempPath, folder, fileName) => {
  const time = new Date()
  const add = `${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}${time.getHours()}${time.getMinutes()}`
  const arr = fileName.split('.')
  arr[arr.length - 2] += `_${add}`
  const newName = arr.join('.')
  const newPath = `./public/${folder}/${newName}`
  fs.renameSync(tempPath, newPath)
  return newPath
}

export { currentDay, currentDateAndTime, getTime, renameFile }
