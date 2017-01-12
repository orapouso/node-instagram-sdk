const request = require('request');
const http = require('http');
const debug = require('debug')('insta:server')

module.exports = (port=process.env.PORT || 5000, clientId=process.env.CLIENT_ID, clientSecret=process.env.CLIENT_SECRET, redirectURI=process.env.REDIRECT_URI) => {
  let index = `
    <html>
      <head>
        <script>
          function authInsta() {
            let instaURL = 'https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=basic+public_content+comments'
            console.log('auth url', instaURL)
            location.href = instaURL
          }
          
          document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded')
            let body = '<button onclick="authInsta()">Auth with Insta</button>'

            if (location.pathname.includes('success')) {
              let re = /code(=([^&]*))?/g
              
              let result = re.exec(location.search)
              if (result && result.length >= 2) {
                body = 'Success'
              } else {
                body = 'No access token for you'
              }          
            }
            
            document.body.innerHTML = body
          })
          
        </script>
      </head>
      <body></body>
    </html>
    `

  let server = http.createServer((req, res) => {
    debug(`request received ${req.method}`)
    
    if (req.method === 'GET') {
      if (req.url.endsWith('/auth')) {
        debug('auth index request')
      } else if (req.url.includes('succes')) {
        debug('success index request')

        let re = /code(=([^&]*))?/g
        let result = re.exec(req.url)

        if (result && result.length >= 2) {
          let code = result[2]
          
          debug('code received', code)
          requestToken(code)
            .then((response) => {
              debug('token response', response.body)
              server.emit('access_token', JSON.parse(response.body))
            })
        }
      } else {
        res.writeHead(404)
        return res.end()
      }
      
      debug('auth index sent')
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
      return res.end(index)
    }
    
    debug('not found', req.url)
    res.writeHead(404)
    res.end()
  })
  
  debug(`server started on port ${port}`)
  server.listen(port)
  return server
  
  function requestToken(code) {
    let options = {
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'post',
      form: {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectURI,
        code: code,
        grant_type: 'authorization_code'
      }
    }
    
    return new Promise((res, rej) => {
      debug('requesting token', code)
      request(options, (err, response) => {
        if (err) {return rej(err)}
        
        res(response)
      })      
    })
  }
}
