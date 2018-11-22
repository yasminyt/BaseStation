import { createUser, getAllUser } from "../controllers/userCtrl";
import { User } from "../models/user";

const create = (req, res, next) => {
  //需要先获得post body中的数据
  const { tel, disabled, name, sex, age, role} = req.body
  const user = new User(tel, tel, disabled, name, sex, age, role)   // 用户初始密码设置为与电话号码一致

  createUser(user, status => {
    if (status)
      res.status(201).send('success')
    else 
      res.status(403).send('该用户记录已存在，不可以再重复添加！')
  })
}

const getAll = (req, res) => {
  getAllUser(rows => {
    if (rows.length)
      res.send(rows)    // tel/disabled/name/sex/age
    else
      res.status(404).send('no records')
  })
}

export { create, getAll }