import { Task, taskModel } from '../models/task'
import { taskItemModel } from '../models/taskItem'

/**
 * create task and return the shots' message which add the taskId
 * @param {object} tasks 
 * @param {string} jobId 
 */
const createTask = (tasks, jobId) => {
  const db = taskModel.prepareInsert()
  let shotArr = []  // 存放图片信息
  let abnormal = 0  // 记录异常情况
  for (let taskItemId in tasks) {
    let tmp = tasks[taskItemId]
    let task = new Task(1, tmp.abnormal, tmp.output, tmp.completedTime, tmp.lat, tmp.lng, jobId, Number(taskItemId))
    const result = taskModel.runInsert(db, task)
    tmp.shot.taskId = result.lastInsertRowid
    shotArr.push(tmp.shot)
    if (tmp.abnormal)
      abnormal = 1
  }
  return {shotArr, abnormal}
}

const queryDetailTask = jobId => {
  const datas = taskModel.getByJobId(jobId)   // 这里得到的一定是已经完成的数据
  /** 未完成的task需要通过task item中的条目来比对 */
  const taskItems = taskItemModel.getAll()
  let itemNames = []
  taskItems.forEach(item => itemNames.push(item.name))
  datas.forEach(item => {
    let index = itemNames.findIndex(item.itemName)
    if ( index !== -1)
      itemNames.splice(index, 1)
  })
  return {completedData: datas, uncompletedData: itemNames}
}

const queryAbnormalTask = (startDate, endDate, userId, towerId, itemId) => {
  const regex = /-/g
  if (startDate)
    startDate.replace(regex, '/')
  if (endDate)
    endDate.replace(regex, '/')
  return taskModel.getAbnormalTask(startDate, endDate, userId, towerId, itemId)
}

export { createTask, queryDetailTask, queryAbnormalTask }