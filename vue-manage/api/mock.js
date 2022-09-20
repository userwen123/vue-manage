import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// https://github.com/nuysoft/Mock/wiki/Mock.mock()
// Mock.mock( rurl, template )
// 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
// rurl可以是路径 也可以是正则表达式

// home页面数据
Mock.mock('/home/getData',homeApi.getStatisticalData)

// user页面数据---新增用户
Mock.mock(/user\/add/,'post',userApi.createUser)

// user页面数据---编辑用户
Mock.mock(/user\/edit/,'post',userApi.updateUser)

//  user页面数据---获取用户列表
Mock.mock(/user\/getUser/,'get',userApi.getUserList)

//  user页面数据---删除数据
Mock.mock(/user\/del/,'post',userApi.deleteUser)

// 登录页面，接口调用
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
