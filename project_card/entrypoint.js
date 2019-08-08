const _ = require('lodash')
const actions = {
  modified: require('./action/modified')
}

// not a 'project_card' event
if (_.get(process.env, 'GITHUB_EVENT_NAME', '') !== 'project_card') {
  console.error(`unsupported event: ${process.env.GITHUB_EVENT_NAME}`)
  process.exit(78)
}

// no GITHUB_EVENT_PATH was provided
if (_.get(process.env, 'GITHUB_EVENT_PATH', '') === '') {
  console.error(`missing env var: GITHUB_EVENT_PATH`)
  process.exit(1)
}

// read extended event info from disk
const event = require(process.env.GITHUB_EVENT_PATH)
const action = _.get(event, 'action', '')

// various card actions
switch (action) {
  case 'created':
  case 'edited':
    actions.modified(event)
    break
  default:
    console.error(`unsupported event action: ${action}`)
    process.exit(78)
}
