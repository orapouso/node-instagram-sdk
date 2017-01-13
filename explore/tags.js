const debug = require('debug')('insta:explore:tags')
const util = require('../util');

module.exports = explore

function explore (name, maxId) {
  let uri = `/tags/${name}`

  let params = {}
  if (maxId) {
    params.max_id = maxId
  }

  debug('explore')
  return util.exploreRequest(uri, params)
    .then((response) => {
      return JSON.parse(response).tag
    })
}
