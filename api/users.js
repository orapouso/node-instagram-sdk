const debug = require('debug')('insta:api:users')
const util = require('../util');

module.exports = {
  id: id,
  search: search
}

function id (accessToken, id) {
  let uri = `/users/${id}`
  debug('id')
  return util.apiRequest(accessToken, uri)
}

function search(accessToken, {count=20, q=''}) {
  let uri = `/users/search`
  let params = {
    count: count,
    q: q,
    access_token: accessToken
  }
  
  debug('search')
  return util.apiRequest(accessToken, uri, params)
}
