const http = require('http')

function sendResponse(res, statusCode, body) {
  res.writeHead(statusCode)
  res.write(body)
  res.end()
}

function send200(res, body) {
  sendResponse(res, 200, body || '<h1>OK</h1>')
}

function send404(res, body) {
  sendResponse(res, 404, body || '<h1>Not Found</h1>')
}

const server = http.createServer((req, res) => {
  const url = req.url
  console.log('url:', url)

  if (url === '/') {
    send200(res, JSON.stringify({ status: 0, data: {}, msg: 'ok' }))
  } else {
    send404(res)
  }
})

server.listen(3000, () => {
  console.log('server running in 3000...')
})
