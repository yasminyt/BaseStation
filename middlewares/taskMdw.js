import newForm from '../configs/fileConfig'
import { renameShot } from '../controllers/shotCtrl'
import { createTask } from '../controllers/taskCtrl'
import { createShot } from '../controllers/shotCtrl'

const uploadTask = (req, res, next) => {
  const form = newForm()
  form.parse(req, (err, fields, files) => {
    const { tasks, jobId } = JSON.parse(fields.fields)
    
    // rename pngs
    const newPath = renameShot(files)
    // save task
    const shotArr = createTask(tasks, jobId)
    // save shot
    createShot(shotArr, newPath)

    res.json({ status: 'success'})
  })
}

export { uploadTask }