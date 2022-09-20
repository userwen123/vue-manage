import axios from 'axios'
import config from '../config'

// 对当前环境变量进行判断,判断当前运行环境是开发环境还是生产环境,以便确定baseUrl
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 基础配置
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {},  //请求头信息
        }
        return config
    }

    // 拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            // console.log('response',response)
            return response;
        }, function (error) {
            // 对响应错误做点什么
            console.log('error',error)
            return Promise.reject(error);
        });
    }

    // 发送请求
    request(options) {
        // 创建axios实例
        const instance = axios.create()

        // 完整配置信息
        options = { ...this.getInsideConfig, ...options }

        // 调用拦截器
        this.interceptors(instance)

        // 返回接口请求结果
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)