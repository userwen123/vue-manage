// 登录中 存储用户token  安装 npm i js-cookie
import Cookie from 'js-cookie'

export default {
    state:{
        token:'',
    },
    mutations:{
        // 存储token
        setToken(state,val) {
            state.token = val
            Cookie.set('token',val)  //cookie的名称  传入的值
        },
        // 清除cookie
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        // 获取token
        getToken(state) {
            // 如果当前缓存中没有token，就从state中获取
            state.token = state.token || Cookie.get('token')
        },
    },
}