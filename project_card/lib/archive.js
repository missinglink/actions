
const octokit = require('./octokit')

// archive card
async function archive (card) {
  const gh = await octokit.projects.updateCard({
    card_id: card.id,
    archived: true
  }).catch(err => { throw err })
  return gh
}

module.exports = archive
