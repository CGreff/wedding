const serve = require('koa-static')
const koaBody = require('koa-body')
const Router = require('koa-router')
const Koa = require('koa')
const app = new Koa()
const router = new Router()

router.post('/rsvp', function (ctx, next) {
    console.log(ctx);

    ctx.status = 200
  })

//Serve Static Components including default route for index.html
app
    .use(serve('src/webapp/static'))
    .use(serve('bower_components'))
    .use(router.routes())
    .use(router.allowedMethods());

var port =  process.env.PORT || 3000;
app.listen(port);

console.log('listening on port ' + port);