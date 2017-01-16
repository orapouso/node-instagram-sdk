// const db = require('level')('access_tokens.db')
// const debug = require('debug')('insta:main')
// 
// const server = require('./server')()
const api = require('./api')
const explore = require('./explore')

// server.on('access_token', (access) => {
//   debug('access')
//   db.put(access.user.username, JSON.stringify(access), () => {
//     debug('access saved', access)
//   })
// })
// 
// explore.tags('errejota')
//   .then((json) => {
//     debug('explore', JSON.stringify(json, null, 2))
//     json.media.nodes.forEach((node) => {
//       debug(node.code)
//     })
//   })
  
module.exports = {
  api: api,
  explore: explore
}

// db.get('orapouso', (err, access) => {
//   let accessToken = JSON.parse(access).access_token
//   
//   api.tags.recent(accessToken, 'copacabana', {count: 5})
//     .then((response) => {
//       debug('teste response', response)
//     })
// })



// let options = {
//   url: 'https://www.instagram.com/query/',
//   method: 'POST',
//   form: 'q=ig_hashtag(errejota)+%7B+media.after(J0HWHkbjwAAAF0HWHkVlwAAAFiYA%2C+55)+%7B%0A++count%2C%0A++nodes+%7B%0A++++caption%2C%0A++++code%2C%0A++++comments+%7B%0A++++++count%0A++++%7D%2C%0A++++comments_disabled%2C%0A++++date%2C%0A++++dimensions+%7B%0A++++++height%2C%0A++++++width%0A++++%7D%2C%0A++++display_src%2C%0A++++id%2C%0A++++is_video%2C%0A++++location+%7B%0A++++++lat%2C%0A++++++lng%0A++++%7D%2C%0A++++likes+%7B%0A++++++count%0A++++%7D%2C%0A++++owner+%7B%0A++++++id%0A++++%7D%2C%0A++++thumbnail_src%2C%0A++++video_views%0A++%7D%2C%0A++page_info%0A%7D%0A+%7D&ref=locations%3A%3Ashow&query_id=',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0',
//     'X-CSRFToken': '0LxPIvvIWHk6R4UWdPBfMGqtdGrj0ZIw',
//     'X-Requested-With': 'XMLHttpRequest',
//     'X-Instagram-AJAX': 1,
//     'Referer': 'https://www.instagram.com/explore/locations/436783651/',
//     'Cookie': 'ig_pr=1; ig_vw=1366; csrftoken=0LxPIvvIWHk6R4UWdPBfMGqtdGrj0ZIw; s_network=; mid=WHeGagAEAAEcmjx1AsyAfa5rZj4W',
//     'Connection': 'keep-alive',
//     'Pragma': 'no-cache',
//     'Cache-Control': 'no-cache'
//   }
// }
// 
// require('request')(options, (err, res, body) => {
//   let json = JSON.parse(body)
//   console.log(JSON.stringify(json, null, 2))
//   // console.log(json.media.nodes.length)
// })