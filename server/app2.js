/*eslint-disable*/
const express = require('express');
const fs = require('fs');
const path = require('path');

const ReactSSR = require('react-dom/server');
const ssr = require('../dist/ssr').default;

const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');//指定字符编码，默认是buffer

const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(ssr);
    res.send(template.replace('<!-- app -->', appString))
})



app.listen(520, () => {
    console.log('server is running at http://localhost:520');
});
