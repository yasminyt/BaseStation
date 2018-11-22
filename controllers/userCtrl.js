import { userModel } from "../models/user";


const createUser = (user, callback) => {
  userModel.create(user, callback)
}

const getAllUser = callback => {
  userModel.getAll(callback)
}

export { createUser, getAllUser }