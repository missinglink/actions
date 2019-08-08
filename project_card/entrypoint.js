const _ = require('lodash')
const head = require('./head')

// not a 'project_card' event
if (_.get(process.env, 'GITHUB_EVENT_NAME', '') !== 'project_card') {
  console.error(`unsupported event: ${process.env.GITHUB_EVENT_NAME}`)
  process.exit(78)
}

// no GITHUB_TOKEN was provided
if (_.get(process.env, 'GITHUB_TOKEN', '') === '') {
  console.error(`missing env var: GITHUB_TOKEN`)
  console.error(`you must add 'secrets = ["GITHUB_TOKEN"]' to your action`)
  process.exit(1)
}

// authenticate with the github API
const Octokit = require('@octokit/rest')
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

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
    modified(event)
    break
  default:
    console.error(`unsupported event action: ${action}`)
    process.exit(78)
}

function jsonMessage (card) {
  const note = _.get(card, 'note', '')

  // try to parse JSON body
  let message = {}
  try { message = JSON.parse(note) } catch (e) {
    console.error(`note body is not text/json`)
    process.exit(78)
  }

  // basic schema validation of message
  if (!_.isPlainObject(message) || !_.isString(message.type)) {
    console.error(`missing field: type`)
    process.exit(78)
  }

  return message
}

// archive card
async function archive (card) {
  const gh = await octokit.projects.updateCard({
    card_id: card.id,
    archived: true
  }).catch(err => { throw err })
  return gh
}

// HEAD action
async function messageTypeHead (event, message) {
  // basic schema validation
  if (!_.isString(message.uri)) {
    console.error(`missing field: uri`)
    process.exit(78)
  }

  const res = await head(message.uri).catch(err => { throw err })
  console.error(res.toJSON())

  // regardless of HEAD errors, archive this card
  const gh = await archive(event.project_card).catch(err => { throw err })
  console.error(gh)
}

async function modified (event) {
  // no project_card object available
  if (_.get(event, 'project_card', '') === '') {
    console.error(`missing event property: project_card`)
    process.exit(1)
  }

  // parse the card body
  let message = jsonMessage(event.project_card)

  // handle message types
  switch (message.type) {
    case 'head':
      messageTypeHead(event, message)
      break
    default:
      console.error(`unsupported message type: ${message.type}`)
      process.exit(78)
  }
}
