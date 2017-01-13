const debug = require('debug')('insta:api:self')
const util = require('../util');

module.exports = {
  recent: recentMedia
}

function recentMedia(accessToken) {
  let uri = `/users/self/media/recent`
  
  debug('recent media')
  return util.apiRequest(accessToken, uri)
}
