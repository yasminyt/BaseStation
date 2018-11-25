import { renameFile } from '../libs/util'
import { Shot, shotModel } from '../models/shot'

/**
 * rename the uploaded picture and return the new path
 * @param {object} shots 
 */
const renameShot = shots => {
  let newPath = []
  for (let key in shots) {   // 根据每个shot文件上传时的name属性值（key）来读取每一张图片
    const { path, name } = shots[key]   // 获得每一张图片上传后的存放路径以及定义的文件名
    newPath.push(renameFile(path, 'img', name))
  }
  return newPath
}

/**
 * create the upload shotting photos' records
 * @param {array} shotArr 
 * @param {array} pathArr 
 */
const createShot = (shotArr, pathArr) => {
  for (let i = 0; i < shotArr.length; i++) {
    let tmp = shotArr[i]
    let shot = new Shot(pathArr[i], tmp.createdTime, tmp.output, tmp.taskId)
    shotModel.create(shot)
  }
}

export { renameShot, createShot }