import { taskItemModel } from '../models/taskItem'

const create = (namesArr, callback) => {
  let errCreate = []
  namesArr.forEach(name => {
    let data = taskItemModel.getByNameSync(name)
    if (data)
      errCreate.push(name)
    else
      taskItemModel.createSync(name)
  })
  callback(errCreate)
}

const getAll = callback => {
  taskItemModel.getAll(callback)
}

export { create, getAll }