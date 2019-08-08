const _ = require('lodash')
const AWS = require('aws-sdk')

// no AWS_ACCESS_KEY_ID was provided
if (_.get(process.env, 'AWS_ACCESS_KEY_ID', '') === '') {
  console.error(`missing env var: AWS_ACCESS_KEY_ID`)
  process.exit(1)
}

// no AWS_SECRET_ACCESS_KEY was provided
if (_.get(process.env, 'AWS_SECRET_ACCESS_KEY', '') === '') {
  console.error(`missing env var: AWS_SECRET_ACCESS_KEY`)
  process.exit(1)
}

// set AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

module.exports = AWS
