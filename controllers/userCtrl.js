import { userModel } from "../models/user";


const createUser = user => userModel.create(user)

const getAllUser = () => userModel.getAll()

const deleteUser = tel => userModel.delete(tel)

const disableUser = tel => userModel.disable(tel, 1)

const unlockUser = tel => userModel.disable(tel, 0)

export { createUser, getAllUser, deleteUser, disableUser, unlockUser }