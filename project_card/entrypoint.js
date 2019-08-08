const _ = require('lodash')
const Octokit = require('@octokit/rest')
const octokit = new Octokit()
const head = require('./head')

// PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
// HOSTNAME=6b4d09078c0c
// GITHUB_ACTION=env
// GITHUB_ACTOR=missinglink
// GITHUB_BASE_REF=
// GITHUB_EVENT_NAME=project_card
// GITHUB_EVENT_PATH=/github/workflow/event.json
// GITHUB_HEAD_REF=
// GITHUB_REPOSITORY=missinglink/actions
// GITHUB_SHA=27dd22d2b39cd25c05f9d68d21f7dc913724c662
// GITHUB_WORKFLOW=project_card
// GITHUB_WORKSPACE=/github/workspace
// HOME=/github/home
// GITHUB_REF=refs/heads/master

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

// handle new card creation
if (action === 'created') {
  const note = _.get(event, 'project_card.note', '')

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

  // head request
  if (message.type === 'head') {
    // basic schema validation
    if (!_.isString(message.uri)) {
      console.error(`missing field: uri`)
      process.exit(78)
    }

    const res = head(message.uri)
    console.error(res)
  } else {
    console.error(`unsupported message type: ${message.type}`)
    process.exit(78)
  }
}

// // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
// octokit.repos.listForOrg({
//   org: 'octokit',
//   type: 'public'
// }).then(({ data }) => {
//   console.error(data)
// })

// octokit.projects.getCard({
//   card_id
// })
