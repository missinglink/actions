const _ = require('lodash')
const Octokit = require('@octokit/rest')

// no GITHUB_TOKEN was provided
if (_.get(process.env, 'GITHUB_TOKEN', '') === '') {
  console.error(`missing env var: GITHUB_TOKEN`)
  console.error(`you must add 'secrets = ["GITHUB_TOKEN"]' to your action`)
  process.exit(1)
}

// authenticate with the github API
module.exports = new Octokit({ auth: process.env.GITHUB_TOKEN })
