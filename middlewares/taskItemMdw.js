import { create, getAll } from '../controllers/taskItemCtrl'

const createTaskItems = (req, res) => {
  // 可能是批量添加，也可能只有一条记录，但都是以数组的形式提交
  const { namesArr } = req.body
  create(namesArr, errCreate => {
    res.send(errCreate)
  })
}

const getAllItems = (req, res) => {
  getAll(rows => {
    res.send(rows)
  })
}

export { createTaskItems, getAllItems }