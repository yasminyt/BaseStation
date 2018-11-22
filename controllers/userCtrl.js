import { userModel } from "../models/user";


const createUser = (user, callback) => {
  userModel.create(user, status => callback(status))
}

const getAllUser = callback => {
  userModel.getAll(rows => callback(rows))
}

export { createUser, getAllUser }