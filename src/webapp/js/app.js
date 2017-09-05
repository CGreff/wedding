const serve = require('koa-static')
const Router = require('koa-router')
const Koa = require('koa')
const app = new Koa()
const router = new Router()
const request = require('request');

/*<form action="http://formspree.io/you@email.com" method="post">
 <input type="email" name="_replyto">
<textarea name="body"></textarea>
<input type="submit" value="Send">
</form> */

var postRsvp = function(rsvpJson) {
    var requestBody = {
        _replyto: 'vehementus@gmail.com',
        subject: 'Wedding RSVP',
        body: rsvpJson,
    };
    
    request.post('https://script.google.com/macros/s/AKfycbxULPdzK92ZtHyVI1ZL0rx41cG0SmklBSSUFK35c-CXLqlxP4_X/exec').form(requestBody);
}

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
    postRsvp(rsvp);
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