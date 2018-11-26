import loginCtrl from '../controllers/loginCtrl'
import { generateToken } from '../libs/jwt'
import { countJobMsg } from '../controllers/jobCtrl';

const loginMdw = (req, res) => {
  const { tel, password } = req.body
  // 这里需要先获得post请求传递过来的参数
  const { status, value } = loginCtrl(tel, password)
  if (status) {
    const token = generateToken({ user: tel, role: ((value === 'admin') ? value : 'user') })
    if (value === 'admin') {
      const countResult = countJobMsg()     
      res.json({ token, data: countResult })
    }
    else
      res.status(200).json({ token: token, jobs: value.jobs, taskItems: value.taskItems })

  } else
    res.status(404).send(value)
}

export default loginMdw