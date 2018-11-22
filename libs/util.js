const currentDay = () => {
  const time = new Date()
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`
}

const currentDateAndTime = () => {
  const time = new Date()
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
}

const getTime = date => {
  const d = new Date(date)
  return d.getTime()
}

const renameFile = fileName => {
  const time = new Date()
  const add = `${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}${time.getHours()}${time.getMinutes()}`
  const arr = fileName.split('.')
  arr[arr.length - 2] += `_${add}`
  return arr.join('.')
}

export { currentDay, currentDateAndTime, getTime, renameFile }
