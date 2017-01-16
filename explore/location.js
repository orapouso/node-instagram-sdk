const debug = require('debug')('insta:explore:location')
const util = require('../util');

module.exports = explore

function explore (location_id, name, maxId) {
  let name_result = name.toLowerCase().trim().split(/\s+/).join('-');
  let uri = `/locations/${location_id}/${name_result}`

  let params = {}
  if (maxId) {
    params.max_id = maxId
  }

  debug('explore')
  return util.exploreRequest(uri, params)
    .then((response) => {
      return JSON.parse(response).location
    })
}
