const _ = require('lodash')

module.exports = (card) => {
  const note = _.get(card, 'note', '')

  // try to parse JSON body
  let message = {}
  try { message = JSON.parse(note) } catch (e) {
    console.error(`note body is not text/json`)
    process.exit(78)
  }

  // basic schema validation of message
  if (!_.isPlainObject(message) || !_.isString(message.task)) {
    console.error(`missing field: task`)
    process.exit(78)
  }

  return message
}
