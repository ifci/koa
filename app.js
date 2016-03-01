'use strict';
const Koa = require('koa');
const app = new Koa();
// const co = require('co');
const Router = require('koa-66');
// const router = new Router();
const mountRouter = new Router();
const Controller = require('./router');
app.use((ctx, next) => {
  const start = new Date;
  return next().then(() => {
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  });
});
// app.use((ctx) => {
//   ctx.body = 'Hello World!';
// });
mountRouter.mount('/blog', Controller.router);
app.use(mountRouter.routes());
app.listen(3001);