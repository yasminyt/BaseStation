import { createUser, getAllUser, deleteUser, disableUser, unlockUser } from "../controllers/userCtrl";
import { User } from "../models/user";
import response from '../libs/response'

const create = (req, res, next) => {
  //需要先获得post body中的数据
  const { tel, disabled, name, sex, age, role } = req.body
  const user = new User(tel, tel, disabled, name, sex, age, role)   // 用户初始密码设置为与电话号码一致

  const result = createUser(user)
  response.cudRes(result, res)
}

const getAll = (req, res) => {
  const rows = getAllUser()
  response.queryAllRes(rows, res)
}

const remove = (req, res) => {
  const tel = req.params.tel
  const result = deleteUser(tel)
  response.cudRes(result, res)
}

const disable = (req, res) => {
  const tel = req.params.tel
  const result = disableUser(tel)
  response.cudRes(result, res)
}

const unlock = (req, res) => {
  const tel = req.params.tel
  const result = unlockUser(tel)
  response.cudRes(result, res)
}

export { create, getAll, remove, disable, unlock }