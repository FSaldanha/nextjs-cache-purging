const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    /*const url = new URL(req.url, "http://localhost:3000")
    console.log(url.searchParams.get('purge'))
    if (url.searchParams.get('purge') == '1') {
      res.removeHeader("Cache-Control")
      res.setHeader("Cache-Control", "s-maxage=0, max-age=0, private, no-cache, no-store, must-revalidate")
      res.setHeader("X-Purge-Result", "Successful")
    }*/
    handle(req, res)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})