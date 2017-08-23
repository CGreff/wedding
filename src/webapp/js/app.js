const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

app.use(serve('src/webapp/static'))
app.use(serve('bower_components'))
var port =  process.env.PORT || 3000;
app.listen(port);

console.log('listening on port 3000')