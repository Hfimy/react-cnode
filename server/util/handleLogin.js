const router = require('koa-router')()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', async (ctx, next) => {
    // const res=await axios.post(`${baseUrl}/accesstoken`);
    // if(res.status===200&&res.data.success){
    //     ctx.response.session.user={
    //         accessToken:ctx.request.body.accessToken,
    //         loginName:ctx.data
    //     }
    // }
    axios.post(`${baseUrl}/accesstokne`, {
        accesstoken: ctx.request.accessToken
    }).then(res=>{
        if(res.status===200 && res.data.success){
            ctx.request.session.user={
                accessToken:ctx.request.body.accessToken,
                loginName:ctx.request.data.loginName,
                id:ctx.request.data.id,
                avatarUrl:res.data.avatar_url
            }
            ctx.response.body={
                success:true,
                data:res.data
            }
        }
    }).catch(err=>{
        if(err.response){
            ctx.response.body={
                success:false,
                data:err.response
            }
        }else{
            next(err)
        }
    })

})
