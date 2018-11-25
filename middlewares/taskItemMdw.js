import { create, getAll } from '../controllers/taskItemCtrl'
import response from '../libs/response';

const createTaskItems = (req, res) => {
  // 可能是批量添加，也可能只有一条记录，但都是以数组的形式提交
  const { namesArr } = req.body
  const errCreate = create(namesArr)
  res.send(errCreate)
}

const getAllItems = (req, res) => {
  const rows = getAll()
  response.queryAllRes(rows, res)
}

export { createTaskItems, getAllItems }