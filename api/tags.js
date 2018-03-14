const debug = require('debug')('insta:api:tags')
const util = require('../util');

module.exports = {
  name: name,
  recent: recentMedia,
  search: search
}

function name (accessToken, name) {
  let uri = `/tags/${name}`
  debug('id')
  return util.apiRequest(accessToken, uri)
}

function recentMedia(accessToken, name, {minId, maxId, count}={count: count=20}) {
  let uri = `/tags/${name}/media/recent`
  let params = {
    count: count
  }
  
  if (minId) {
    params.min_tag_id = minId
  }

  if (maxId) {
    params.max_tag_id = maxId
  }
  
  debug('recent media', minId, maxId, count)
  return util.apiRequest(accessToken, uri, params)
}

function search(accessToken, {q=''}) {
  let uri = `/tags/search`
  let params = {
    q: q,
    access_token: accessToken
  }
  
  debug('search')
  return util.apiRequest(accessToken, uri, params)
}
