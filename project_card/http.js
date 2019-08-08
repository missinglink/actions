const fs = require('fs')
const _ = require('lodash')
const request = require('superagent')
const Throttle = require('superagent-throttle')

// be kind to the provider servers
let throttle = new Throttle({
  active: true, // set false to pause queue
  rate: 100, // how many requests can be sent every `ratePer`
  ratePer: 1000, // number of ms in which `rate` requests may be sent
  concurrent: 100 // how many requests can be sent concurrently
})

async function head (uri) {
  // make an HTTP HEAD request
  const res = await request
    .head(uri)
    .redirects(5)
    .use(throttle.plugin())

  // handle HTTP errors
  if (res.status >= 400) { throw new Error(`HTTP ${res.status}`) }

  return res
}

async function download (uri, path) {
  return new Promise((resolve, reject) => {
    try {
      // create write stream
      const stream = fs.createWriteStream(path)

      // a variable to store the response message
      // (for things like status code and headers)
      let res

      // handle stream events
      stream.on('close', () => {
        let ret = res
        if (typeof _.get(res, 'toJSON', '') === 'function') {
          ret = res.toJSON()
        }
        resolve(ret)
      })
      stream.on('error', (e) => reject(e))

      // make an HTTP GET request
      request
        .get(uri)
        .redirects(5)
        .use(throttle.plugin())
        .on('response', (response) => { res = response })
        .pipe(stream)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports.head = head
module.exports.download = download
