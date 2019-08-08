const _ = require('lodash')
const http = require('../http')
const archive = require('../archive')

// HEAD task
async function task (event, msg) {
  // basic schema validation
  if (!_.isString(msg.uri)) {
    console.error(`missing field: uri`)
    process.exit(78)
  }

  const res = await http.head(msg.uri).catch(err => { throw err })
  console.error(res.toJSON())

  // regardless of HEAD errors, archive this card
  const gh = await archive(event.project_card).catch(err => { throw err })
  console.error(gh)
}

module.exports = task
