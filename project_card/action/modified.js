const _ = require('lodash')
const message = require('../lib/message')
const tasks = {
  head: require('../lib/task/head'),
  get: require('../lib/task/get')
}

async function modified (event) {
  // no project_card object available
  if (_.get(event, 'project_card', '') === '') {
    console.error(`missing event property: project_card`)
    process.exit(1)
  }

  // parse the card body
  let msg = message(event.project_card)

  // handle message types
  console.info(`execute message task: ${msg.task}`)
  switch (msg.task) {
    case 'head':
      tasks.head(event, msg)
      break
    case 'download':
      tasks.get(event, msg)
      break
    default:
      console.error(`unsupported message task: ${msg.task}`)
      process.exit(78)
  }
}

module.exports = modified
