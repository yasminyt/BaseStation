import xlsx from 'node-xlsx'
import { renameFile } from '../libs/util'
import { addJobs, doCombinedQuery } from '../controllers/jobCtrl'
import newForm from '../configs/fileConfig'

const saveFile = (req, res, next) => {
  const form = newForm()
  form.parse(req, (err, fields, files) => {
    // fields 普通表单数据
    // files 文件数据
    if (err) {
      console.log(err)
      return
    }
    // 这里需要注意的是，files.file中的这个file对应的是input元素中的name属性的值
    const newPath = renameFile(files.jobFile.path, 'file', files.jobFile.name)
    req.filePath = newPath
    next()
  })
}

const readFile = (req, res, next) => {
  const obj = xlsx.parse(req.filePath)
  let datas = obj[0].data    //取得excel表中第一个工作区的数据，以数组的形式返回
  datas = datas.filter(item => item.length)   // 过滤掉其中的空数组
  datas.splice(0, 1)  // 去掉行首
  const createdUser = req.decoded.user
  const result = addJobs(datas, createdUser)
  res.send(result)  // 返回一个json数据给前端，包括了重复的数据以及过期的数据
}

const combinedQuery = (req, res) => {
  const { userId, towerCode, inspectionDate, status } = req.body
  const { completed, abnormal } = status
  const result = doCombinedQuery(userId, towerCode, inspectionDate, completed, abnormal)
  res.send(result)
}

export { saveFile, readFile, combinedQuery }

/** 以下为经过 xlsx.parse() 后的excel表中第一个工作区的数据样例 */
/**
* [ [ '基站编号', '人员手机号码', '巡检日期' ],    --------> 表头
    [ '基站A', 123445, 43424 ],                  --------> excel表中的内容
    [ '基站B', 123446, 43425 ],
    [ '基站C', 123447, 43426 ],
    [ '基站D', 123448, 43427 ],
    [],                                         ---------> 空白的行，应注意忽略掉
    [],
    [],
    [],
    [],
    [] ]
*/