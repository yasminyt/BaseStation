/**
 * Response for query one record
 * @param {object} data 
 * @param {object} res 
 */
const queryRes = (data, res) => {
  if (data)
    res.send({status: true, data: data})
  else
    res.send({status: false})
}

/**
 * Response for query all records
 * @param {array} datas 
 * @param {object} res 
 */
const queryAllRes = (datas, res) => {
  if (datas.length) 
    res.send({status: true, datas: datas})
  else
    res.send({status: false})
}

/**
 * Response for create、update、delete
 * @param {Boolean} status 
 * @param {object} res 
 */
const cudRes = (status, res) => {
  if (status) 
    res.json({status: true})
  else
    res.json({status: false, msg: 'fail'})
}

const response = {
  queryRes: queryRes,
  queryAllRes: queryAllRes,
  cudRes: cudRes
}

export default response
