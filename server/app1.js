/*eslint-disable*/
const Koa = require('koa');
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
// const static = require('koa-static');
const koaStaticPlus = require('koa-static-plus');
const ReactSSR = require('react-dom/server');
const ssr = require('../dist/ssr').default;

const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');//指定字符编码，默认是buffer

const app = new Koa();

app.use(koaStaticPlus(path.resolve(__dirname, '../dist'), {
    pathPrefix: '/public'
}))

router.get('*', async (ctx, next) => {
    const appString = ReactSSR.renderToString(ssr);
    ctx.body = template.replace('<app></app>', appString)
})

app.use(router.routes())

app.listen(520, () => {
    console.log('server is running at http://localhost:520');
});
