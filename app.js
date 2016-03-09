"use strict";
/*const koa = require('koa');
const app = new koa();

app.use((ctx, next) => {
  const start = new Date;
  return next().then(() => {
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  });
});

app.use((ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3001);*/

var koa = require('koa');
var app = new koa();

/*app.use(function *() {
  this.body = "header\n";
  yield saveResults.call(this);
  this.body += "footer\n";
});

function *saveResults() {
  this.body += "Results Saved!\n";
}*/

// 多个中间件的合并
/*function *random(next) {
  if ('/random' == this.path) {
    this.body = Math.floor(Math.random()*10);
  } else {
    yield next;
  }
};

function *backwards(next) {
  if ('/backwards' == this.path) {
    this.body = 'sdrawkcab';
  } else {
    yield next;
  }
}

function *pi(next) {
  if ('/pi' == this.path) {
    this.body = String(Math.PI);
  } else {
    yield next;
  }
}

function *all(next) {
  yield random.call(this, backwards.call(this, pi.call(this, next)));
}

app.use(all);*/

// 路由
// 多路径
// normal route
/*app.use(function* (next) {
  if (this.path !== '/') {
    return yield next
  }

  this.body = 'hello world'
});

// /404 route
app.use(function* (next) {
  if (this.path !== '/404') {
    return yield next;
  }

  this.body = 'page not found'
});

// /500 route
app.use(function* (next) {
  if (this.path !== '/500') {
    return yield next;
  }

  this.body = 'internal server error'
});*/

// 使用koa-router
var Router = require('koa-router');

var myRouter = new Router();

var render = require('koa-ejs');

var path = require('path');

var configs = require('./configs/configs');

app.title = configs.name;

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(function* (next) {
  this.state = this.state || {};
  this.state.now = new Date();
  this.state.ip = this.ip;
  this.state.title = app.title;
  this.state.version = '2.0.0';
  yield next;
});

app.use(function *() {
  var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
  yield this.render('content', {
    users: users
  });
});

/*myRouter.get('/', function *(next) {
  this.response.body = 'Hello World!';
});

app.use(myRouter.routes());*/

// 错误处理机制
app.use(function *() {
  try {
    yield saveResults();
  } catch (err) {
    this.throw(400, '数据无效');
  }
});

app.listen(3001);