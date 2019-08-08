const fs = require('fs')
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
    // create write stream
    const stream = fs.createWriteStream(path)

    // make an HTTP GET request
    const res = request
      .get(uri)
      .redirects(5)
      .use(throttle.plugin())

    // handle stream events
    stream.on('close', () => resolve(res))
    stream.on('error', (e) => reject(e))

    // pipe the streams together
    res.pipe(stream)
  })
}

module.exports.head = head
module.exports.download = download
