const request = require('request')
const debug = require('debug')('insta:api')

const API_BASE_URI = 'https://api.instagram.com/v1'
const EXPLORE_BASE_URI = 'https://www.instagram.com/explore'

module.exports = {
  apiRequest: apiRequest,
  exploreRequest: exploreRequest
}

function apiRequest(accessToken, url, params={}) {
  if (!accessToken) { return Promise.reject(new Error('no access token'))}

  url = API_BASE_URI + url

  params.access_token = accessToken

  return makeRequest(url, params)
}

function exploreRequest(url, params={}) {

  url = EXPLORE_BASE_URI + url
  params.__a = 1

  return makeRequest(url, params)
}

function makeRequest(url, params={}) {
  return new Promise((res, rej) => {
    if (!url) { return rej(new Error('no url'))}

    let options = {
      method: 'get',
      url: url,
      qs: params
    }

    debug('request', options)
    request(options, (err, response, body) => {
      if (err) {return rej(err)}
      if (response.statusCode >= 400) {return rej(new Error(response.statusCode + ': ' + body))}

      res(body)
    })
  })
}
