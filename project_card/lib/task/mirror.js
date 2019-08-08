const fs = require('fs')
const zlib = require('zlib')
const _ = require('lodash')
const http = require('../http')
// const archive = require('../archive')
const AWS = require('../aws')

const tmpPath = '/tmp/mydownload.file'

// MIRROR task
async function task (event, msg) {
  // basic schema validation
  if (!_.isString(msg.uri)) {
    console.error(`missing field: uri`)
    process.exit(78)
  }
  if (!_.isString(_.get(msg, 's3.bucket'))) {
    console.error(`missing field: s3.bucket`)
    process.exit(78)
  }
  if (!_.isString(_.get(msg, 's3.key'))) {
    console.error(`missing field: s3.key`)
    process.exit(78)
  }

  // download file and log header info
  const res = await http.download(msg.uri, tmpPath).catch(err => { throw err })
  console.error(res.toJSON())

  // stat file on disk
  console.error(fs.statSync(tmpPath))

  // upload the file to s3
  const aw = await upload(tmpPath, msg.s3.bucket, msg.s3.key).catch(err => { throw err })
  console.error(aw)

  // // regardless of errors, archive this card
  // const gh = await archive(event.project_card).catch(err => { throw err })
  // console.error(gh)
}

async function upload (filePath, bucket, key) {
  // create an s3 object
  var s3obj = new AWS.S3({ params: { Bucket: bucket, Key: key } })

  // create a gzip stream for s3
  // const gzipStream = fs.createReadStream(filePath).pipe(zlib.createGzip())
  const gzipStream = fs.createReadStream(filePath)

  // upload the file to s3
  return s3obj.upload({ Body: gzipStream })
    .on('httpUploadProgress', (evt) => { console.log('progress', evt) })
    .promise()
}

module.exports = task
