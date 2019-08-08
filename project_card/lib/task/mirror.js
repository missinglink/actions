const fs = require('fs')
const _ = require('lodash')
const http = require('../http')
const archive = require('../archive')
const s3 = require('../s3')

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

  // upload the file to s3
  const aw = await s3.upload(
    fs.createReadStream(tmpPath),
    { Bucket: msg.s3.bucket, Key: msg.s3.key }
  ).catch(err => { throw err })
  console.error(aw)

  // upload the request metadata to s3
  const aw2 = await s3.upload(
    JSON.stringify(res.toJSON(), null, 2),
    { Bucket: msg.s3.bucket, Key: msg.s3.key + '.meta' }
  ).catch(err => { throw err })
  console.error(aw2)

  // regardless of errors, archive this card
  const gh = await archive(event.project_card).catch(err => { throw err })
  console.error(gh)
}

module.exports = task
