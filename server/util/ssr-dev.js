const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
// const proxy=require('http-proxy-middleware');
const ReactSSR = require('react-dom/server');
const config = require('../../server-render-config/webpack.ssr');

const getTemplate = async () => {
    const response = await axios.get('http://localhost:521/public/index.html');
    return response.data;
};

let serverBundle;
const Module = module.constructor;

const compile = webpack(config);
const mfs = new MemoryFs();
compile.outputFileSystem = mfs;
compile.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(config.output.path, config.output.filename);
    const bundle = mfs.readFileSync(bundlePath, 'utf8');
    const m = new Module();
    m._compile(bundle, 'ssr.js');
    serverBundle = m.exports.default;
});


module.exports = (router) => {
    
    router.get('/', async (ctx, next) => {
        const template = await getTemplate();
        const content = ReactSSR.renderToString(serverBundle);
        ctx.body = template.replace('<!-- app -->', content);
    });
};
