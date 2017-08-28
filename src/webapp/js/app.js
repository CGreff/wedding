const serve = require('koa-static')
const Router = require('koa-router')
const Koa = require('koa')
const app = new Koa()
const router = new Router()

router.get('/rsvp', function (ctx, next) {
    var rsvp = {}
    var query = ctx.request.url.split("?")[1];
    query.split("&").forEach(function(part, index, array) {
        var item = part.split("=");
        if (index === 0) {
            rsvp[item[0]] = decodeURIComponent(item[1]);
        } else if (index == 1) {
            rsvp['attending'] = item[0];
        } else if (index == 2) {
            rsvp['diet'] = item[0];
        }
    });

    console.log(rsvp);
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