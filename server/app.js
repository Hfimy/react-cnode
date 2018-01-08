/*eslint-disable*/
const Koa = require('koa');
const ReactSSR = require('react-dom/server');
const ssr = require('../dist/ssr').default;

const app = new Koa();

app.use(async (ctx, next) => {
    const appString = ReactSSR.renderToString(ssr);
    ctx.body = appString;
});

app.listen(520, () => {
    console.log('server is running at http://localhost:520');
});
