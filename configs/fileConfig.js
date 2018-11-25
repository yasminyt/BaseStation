import formidable from 'formidable'

export default function newForm() {
  const form = new formidable.IncomingForm()

  form.uploadDir = './public/tmp'   // 设置上传的临时路径
  form.encoding = 'utf-8'
  form.keepExtensions = true            //保留后缀
  form.maxFileSize = 2 * 1024 * 1024

  return form
}
