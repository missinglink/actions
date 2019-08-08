const fs = require('fs')
const _ = require('lodash')
const http = require('../http')
const archive = require('../archive')
const tmpPath = '/tmp/mydownload.file'

// GET task
async function task (event, msg) {
  // basic schema validation
  if (!_.isString(msg.uri)) {
    console.error(`missing field: uri`)
    process.exit(78)
  }

  // download file and log header info
  const res = await http.download(msg.uri, tmpPath).catch(err => { throw err })
  console.error(res.toJSON())

  // stat file on disk
  console.error(fs.statSync(tmpPath))

  // regardless of errors, archive this card
  const gh = await archive(event.project_card).catch(err => { throw err })
  console.error(gh)
}

module.exports = task
