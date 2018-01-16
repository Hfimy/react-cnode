/*eslint-disable*/
const router = require('koa-router')();
const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1';

module.exports = (router) => {
    router.post('/login', async (ctx, next) => {
        axios.post(`${baseUrl}/accesstoken`, {
            accesstoken: ctx.request.body, accessToken,
        }).then((res) => {
            if (res.status === 200 && res.data.success) {
                ctx.request.session.user = {
                    accessToken: ctx.request.body.accessToken,
                    loginName: res.data.loginName,
                    id: res.data.id,
                    avatarUrl: res.data.avatar_url,
                };
                ctx.response.body = {
                    success: true,
                    data: res.data,
                };
            }
        }).catch((err) => {
            // 业务逻辑错误，如accessToken不正确
            if (err.response) {
                ctx.response.body = {
                    success: false,
                    data: err.response,
                };
            } else { // 服务器错误
                console.log(err);
            }
        });
    });
};
