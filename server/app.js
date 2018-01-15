/*eslint-disable*/
const path = require('path');
const Koa = require('koa');
const router = require('koa-router')();
const favicon = require('koa-favicon');

const app = new Koa();

app.use(favicon(path.resolve(__dirname, './favicon.ico')));

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    // 开发环境
    const proxy = require('koa-proxy2');
    app.use(proxy({
        proxy_rules: [
            {
                proxy_location: /^\/public\//,
                proxy_pass: 'http://localhost:521',
            },
        ],
    }));
    const ssrDev = require('./util/ssr-dev');
    ssrDev(router);
} else {
    // 生产环境
    const fs = require('fs');
    const path = require('path');

    const mount = require('koa-mount');
    const staticApp = new Koa();
    staticApp.use(require('koa-static')(path.resolve(__dirname, '../dist')));
    app.use(mount('/public', staticApp));

    const ReactDOMServer = require('react-dom/server');
    const ssr = require('../dist/ssr').default;
    const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');
    router.get('/', async (ctx, next) => { //eslint-disable-line
        const content = ReactDOMServer.renderToString(ssr); // 将react对象转换成html字符串
        ctx.body = template.replace('<!-- app -->', content);
    });
}

app.use(router.routes());

app.listen(520, () => {
    console.log('server is running at http://localhost:520');//eslint-disable-line
});
