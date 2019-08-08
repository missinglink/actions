const _ = require('lodash')
const crypto = require('crypto')

// change the algo to sha1, sha256 etc according to your requirements
function hash (fileStream, options) {
  return new Promise((resolve, reject) => {
    try {
      const algo = _.get(options, 'algo', 'sha256')
      let shasum = crypto.createHash(algo)

      fileStream.on('data', (d) => { shasum.update(d) })
      fileStream.on('end', () => { resolve(shasum.digest('hex')) })
      fileStream.on('error', (e) => reject(e))
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = hash
