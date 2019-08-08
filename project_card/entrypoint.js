const _ = require('lodash')
const Octokit = require('@octokit/rest')
const octokit = new Octokit()

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
if (_.get(process.env, 'GITHUB_EVENT_NAME', '') !== 'project_card'){
  process.exit(78)
}

// no GITHUB_SHA was provided
if (_.get(process.env, 'GITHUB_SHA', '').length !== 40) {
  process.exit(78)
}

// read extended event info from disk
const event = require(process.env.GITHUB_EVENT_PATH)
console.error(event)

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