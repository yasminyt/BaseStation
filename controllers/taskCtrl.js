import { Task, taskModel } from '../models/task'

/**
 * create task and return the shots' message which add the taskId
 * @param {object} tasks 
 * @param {string} jobId 
 */
const createTask = (tasks, jobId) => {
  let shotArr = []  // 存放图片信息
  for (let taskItemId in tasks) {
    let tmp = tasks[taskItemId]
    let task = new Task(1, tmp.abnormal, tmp.output, tmp.completedTime, tmp.lat, tmp.lng, jobId, taskItemId)
    const taskId = taskModel.addTask(task)
    tmp.shot.taskId = taskId
    shotArr.push(tmp.shot)
  }
  return shotArr
}

export { createTask }