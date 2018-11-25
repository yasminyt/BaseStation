import { taskItemModel } from '../models/taskItem'

const create = namesArr => {
  let errCreate = []
  namesArr.forEach(name => {
    let data = taskItemModel.getByName(name)
    if (data)
      errCreate.push(name)
    else
      taskItemModel.create(name)
  })
  return errCreate
}

const getAll = () => taskItemModel.getAll()

export { create, getAll }