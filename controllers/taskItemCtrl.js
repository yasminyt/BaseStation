import { taskItemModel } from '../models/taskItem'

const create = (namesArr, callback) => {
  let i = 0
  let errCreate = []
  do {
    let name = namesArr[i]
    // 先查询是否已存在该记录
    taskItemModel.getByName(name, data => {
      if (data) 
        errCreate.push(name)
      else 
        taskItemModel.create(name)
      i++
    })
  } while(i < namesArr.length)
  callback(errCreate)
}

const getAll = callback => {
  taskItemModel.getAll(callback)
}

export { create, getAll }