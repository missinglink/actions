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

module.exports = head
