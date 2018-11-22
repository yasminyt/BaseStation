import formidable from 'formidable'

const form = new formidable.IncomingForm()

form.uploadDir = '../public'    // 设置上传的路径
form.encoding = 'utf-8'
form.keepExtensions = true            //保留后缀
form.maxFileSize = 2 * 1024 * 1024

export default form
