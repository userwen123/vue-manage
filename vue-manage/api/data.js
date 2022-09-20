import axios from './axios'

// home页面数据获取
export const getData = () => {
    return axios.request({
        url:'/home/getData', //默认get请求
    })
}

// user页面获取用户列表
export const getUser = (params) => {
    return axios.request({
        url:'/user/getUser',
        method:'get',
        params
    })
}

// 登录页面 接口请求
export const getMenu = (params) => {
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:params
    })
}