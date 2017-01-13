const debug = require('debug')('insta:api:locations')
const util = require('../util');

module.exports = {
  id: id,
  search: search
}

function id(accessToken, locationId) {
  let uri = `/locations/${locationId}`
  debug('id')
  return util.apiRequest(accessToken, uri)
}

function search(accessToken, {lat=0, lng=0, distance=500, id}) {
  let uri = `/locations/search`
  let params = {
    distance: distance,
    access_token: accessToken
  }
  if (id) {
    params.id = id
  } else {
    params.lat = lat
    params.lng = lng
  }
  
  debug('search')
  return util.apiRequest(accessToken, uri, params)
}
