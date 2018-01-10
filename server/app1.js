/*eslint-disable*/
const Koa = require('koa');
const router = require('koa-router')();


const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
    const fs = require('fs');
    const path = require('path');
    const mount = require('koa-mount');
    // const koaStaticPlus = require('koa-static-plus');
    const ReactSSR = require('react-dom/server');
    const ssr = require('../server-render-dist/ssr').default;
    const template = fs.readFileSync(path.resolve(__dirname, '../server-render-dist/index.html'), 'utf8');//指定字符编码，默认是buffer

    // app.use(koaStaticPlus(path.resolve(__dirname, '../server-render-dist'), {
    //     pathPrefix: '/public'
    // }))
    const appStatic = new Koa();
    appStatic.use(require('koa-static')(path.resolve(__dirname, '../server-render-dist')))
    app.use(mount('/public', appStatic));

    router.get('/', async (ctx, next) => {
        const appString = ReactSSR.renderToString(ssr);
        ctx.body = template.replace('<!-- app -->', appString)
    })
} else {
    const proxy = require('koa-proxy2');
    app.use(proxy({
        proxy_rules:[
            {
                proxy_location:/^\/public\//,
                proxy_pass:'http://localhost:521'
            }
        ]
    }))
   
    const ssrDev = require('./util/ssr-dev');
    ssrDev(router);
    // dev(router)
}


app.use(router.routes())

app.listen(520, () => {
    console.log('server is running at http://localhost:520');
});
