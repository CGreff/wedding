const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

app.use(serve('src/webapp/static'))
app.use(serve('bower_components'))
app.listen(3000)

console.log('listening on port 3000')