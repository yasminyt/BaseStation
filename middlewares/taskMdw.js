import newForm from '../configs/fileConfig'
import { renameShot } from '../controllers/shotCtrl'
import { createTask, queryDetailTask } from '../controllers/taskCtrl'
import { createShot } from '../controllers/shotCtrl'
import { updateJobStatus } from '../controllers/jobCtrl';

const uploadTask = (req, res, next) => {
  const form = newForm()
  form.parse(req, (err, fields, files) => {
    const { tasks, jobId } = JSON.parse(fields.fields)
    
    // rename pngs
    const newPath = renameShot(files)
    // save task
    const { shotArr, abnormal} = createTask(tasks, jobId)
    // save shot
    createShot(shotArr, newPath)
    // modify the job completed value
    updateJobStatus(jobId, shotArr.length, abnormal)

    res.json({ status: 'success'})
  })
}

const getDetailTask = (req, res) => {
  const { jobId } = req.params
  const result = queryDetailTask(jobId)
  res.send(result)
}

export { uploadTask, getDetailTask }