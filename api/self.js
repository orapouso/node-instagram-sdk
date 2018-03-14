const debug = require('debug')('insta:api:self')
const util = require('../util');

module.exports = {
  info: info,
  recent: recentMedia,
  liked: likedMedia
}

function info(accessToken) {
  let uri = `/users/self`

  return util.apiRequest(accessToken, uri)
}

function recentMedia(accessToken, {maxId, minId, count}={count:20}) {
  let uri = `/users/self/media/recent`
  
  let params = {
    count: count
  }

  if (minId) {
    params.min_tag_id = minId
  }

  if (maxId) {
    params.max_tag_id = maxId
  }

  debug('recent media')
  return util.apiRequest(accessToken, uri, params)
}

function likedMedia(accessToken, {maxId, count}={count:20}) {
  let uri = `/users/self/media/liked`

  let params = {
    count: count
  }

  if (maxId) {
    params.max_tag_id = maxId
  }

  debug('liked media', maxId, count)
  return util.apiRequest(accessToken, uri, params)
}
