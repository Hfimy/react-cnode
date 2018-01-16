/*eslint-disable*/
const path = require('path');
const Koa = require('koa');
const router = require('koa-router')();
const favicon = require('koa-favicon');
const bodyParser = require('koa-bodyparser')
const session = require('koa-session');
const app = new Koa();

app.use(favicon(path.resolve(__dirname, './favicon.ico')));
app.use(bodyParser())  //默认json、form

app.use(session({
    key: 'sid',
    maxAge: 10 * 60 * 1000,
    overwrite: false, //重写
    rolling: false,  //强制在每个响应中保存
}))

router.use('/api/user',()=>require('./util/login')(router));

app.use(router.routes());

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
    const ssrDev = require('./util/ssrDev');
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

app.listen(520, () => {
    console.log('server is running at http://localhost:520');//eslint-disable-line
});
