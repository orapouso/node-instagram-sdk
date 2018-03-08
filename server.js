const request = require('request');
const http = require('http');
const lt = require('localtunnel')
const debug = require('debug')('insta:server')

module.exports = ({port, clientId, clientSecret, subdomain}={port:process.env.PORT || 5000, clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, subdomain: process.env.SUBDOMAIN}) => {

  let index = `
    <html>
      <head>
        <script>
          function authInsta() {
            
            fetch('/auth/url')
              .then(res => res.json())
              .then(instaURL => {
                instaURL = \`https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=\${instaURL.data}&response_type=code&scope=basic+public_content+comments\`
                console.log('auth url', instaURL)
                location.href = instaURL
              })
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

  let tunnel
  let server = http.createServer((req, res) => {
    debug(`request received ${req.method}`)
    
    let statusCode = 200
    let headers = {'Content-Type': 'text/html; charset=utf-8'}
    let response = index
    if (req.method === 'GET') {
      if (req.url.endsWith('/auth/url')) {
        debug('auth URL request')
        headers = {'Content-Type': 'application/json'}
        response = JSON.stringify({data: getInstaURL()})

      } else if (req.url.endsWith('/auth')) {
        debug('auth index request')
      } else if (req.url.includes('success')) {
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
            .catch(error => console.log('REQUEST TOKEN ERROR', error))
        }
      } else {
        statusCode = 404
        response = 'Not found'
      }
      
      debug('auth index sent')
    } else {
      debug('method not allowed', req.method, req.url)
      statusCode = 405
      response = 'Method not allowed'
    }
    
    res.writeHead(statusCode, headers)
    return res.end(response)
  })
  
  // once the server is up, starts a localtunnel to get the auth response
  // from instagram
  server.once('listening', () => {
    debug(`server started on port ${port}`)
    console.log('Open your browser to http://localhost:5000')

    if (subdomain) {
      tunnel = lt(port, {subdomain: subdomain}, (error, tunnel) => {
        if (error) { debug('ERROR on creating tunnel', error) }
        debug(`local tunnel created on url: ${tunnel.url}`)
      })
  
      tunnel.on('error', (error) => {
        debug('local tunnel error', error)
      })
    }
  })

  server.once('close', () => {
    if (tunnel) {
      tunnel.close()
    }
  })

  server.listen(port)
  return server

  function getInstaURL() {
    return `${tunnel.url}/success`
  }
  
  function requestToken(code) {
    let options = {
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'post',
      form: {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getInstaURL(),
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
