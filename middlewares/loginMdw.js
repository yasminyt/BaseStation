import loginCtrl from '../controllers/loginCtrl'
import { generateToken } from '../libs/jwt'

const loginMdw = (req, res, next) => {
  const { tel, password } = req.body
  // 这里需要先获得post请求传递过来的参数
  loginCtrl(tel, password, (status, value) => {
    if (status) {
      const token = generateToken({ user: tel, role: ((value === 'admin') ? value : 'user') })
      if (value === 'admin') {
        //todo 获取管理员登录后的页面

        //todo 
        res.json({token: token})
      }
      else 
        res.status(200).json({token: token, jobs: value})
        
    } else
      res.status(404).send(value)
  })
}

const responseToManger = (req, res) => {
  console.log('second function')
}



export default loginMdw