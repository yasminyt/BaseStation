import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import loginRouter from './routes/loginRouter';
import userRouter from './routes/userRouter';
import towerRouter from './routes/towerRouter';
import jobRouter from './routes/jobRouter';
import auth from './middlewares/auth';
import taskItemRouter from './routes/taskItemRouter';

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

// login
app.use('/login', loginRouter)
// auth
app.use(auth)
// user request
app.use('/user', userRouter)
// tower request
app.use('/tower', towerRouter)
// job request
app.use('/job', jobRouter)
// task item request
app.use('/task-item', taskItemRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`)
})