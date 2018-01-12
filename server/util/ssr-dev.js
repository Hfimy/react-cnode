/*eslint-disable*/
const path = require('path');
const webpack = require('webpack');
const config = require('../../config/webpack.ssr');
const ReactDOMServer = require('react-dom/server');

const axios = require('axios');

const getTemplate = async () => {
    const res = await axios.get('http://localhost:521/public/index.html');
    return res.data;
};

let ssr;

const Module = module.constructor;
const m = new Module();

const MemoryFs = require('memory-fs');

const mfs = new MemoryFs();

const compile = webpack(config);
compile.outputFileSystem = mfs;

compile.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));//eslint-disable-line
    stats.warnings.forEach(warn => console.warn(warn));//eslint-disable-line
    const bundlePath = path.resolve(config.output.path, config.output.filename);
    const bundle = mfs.readFileSync(bundlePath, 'utf8');
    m._compile(bundle, 'ssr.js');
    ssr = m.exports.default;
});

module.exports = (router) => {
    router.get('/', async (ctx, next) => {//eslint-disable-line
        const template = await getTemplate();
        const content = ReactDOMServer.renderToString(ssr);
        ctx.body = template.replace('<!-- app -->', content);
    });
};
