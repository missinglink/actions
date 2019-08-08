const AWS = require('../aws')

async function upload (body, params) {
  // create an s3 object
  var s3obj = new AWS.S3({ params: (params || {}) })

  // upload the file to s3
  return s3obj.upload({ Body: body })
    .on('httpUploadProgress', (evt) => {
      console.log('upload', evt)
    })
    .promise()
}

module.exports.upload = upload
