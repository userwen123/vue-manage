<template>
<!-- 
    model	表单数据对象	object
    rules	表单验证规则	object
    status-icon	是否在输入框中显示校验结果反馈图标	boolean	默认false
    label-width	表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。	string	
 -->
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <!-- 
        用户名input框
        label-width	表单域标签的的宽度，例如 '50px'。支持 auto。	string
        prop	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的	string	   可选值：传入 Form 组件的 model 中的字段
     -->
    <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
    >
       <!-- 
            autocomplete 属性规定输入字段是否应该启用自动完成功能。
            自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。
            on	默认。规定启用自动完成功能。
            off	规定禁用自动完成功能。
        -->
        <el-input
            type="input"
            v-model="form.username"
            autocomplete="off"
            palceholder="请输入账号"
        ></el-input>
    </el-form-item>

    <!-- 
        密码input框
     -->
    <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
    >
        <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            palceholder="请输入密码"
        ></el-input>
    </el-form-item>

    <!-- 按钮 -->
    <el-form-item class="login_submit">
        <el-button type="primary" @click="login" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 由于无后端，这里用mock，模拟token
// import Mock from 'mockjs'
// 引入接口调用
import {getMenu} from '../../api/data'

export default {
    name:'login',
    data() {
        return {
            // 存储用户登录时输入的username和password
            form:{},
            rules:{
                // 用户名的校验规则
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {
                        min:3,
                        message:"用户名长度不能小于3位",
                        trigger:'blur'  //触发方式
                    },
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                ],
            },
        }
    },
    methods: {
        // 点击登录按钮
        login() {
            // 调用登录接口
            getMenu(this.form).then(({data:res}) => {
                // console.log(res)
                // {data:res} 解构赋值，原本数据res是一个对象
                // 这里相当于把res对象中的data提出来，然后重命名为res
                if(res.code === 20000) {
                    // 首先清除当前menu中的路由数据
                    this.$store.commit('clearMenu')
                    // 将Menu数据缓存到cookie中，避免浏览器刷新过程中丢失 menu 数据
                    this.$store.commit('setMenu',res.data.menu)
                    // 存储token
                    this.$store.commit('setToken',res.data.token)
                    // 动态添加路由
                    this.$store.commit('addMenu',this.$router)
                    // 登录成功后页面跳转到系统首页
                    this.$router.push({name:'home'})
                } else {
                    this.$message.warning(res.data.message)
                }
            })

            // // 生成随机token
            // const token = Mock.random.guid()
            // // 存储token
            // this.$store.commit('setToken',token)
            // // 登录成功后跳转到系统首页
            // this.$router.push({name:'home'})
        },
    },
}
</script>

<style lang="less" scoped>
.login-container{
    border-radius: 15px;
    // 设置背景范围，可选值：border-box padding-box content-box，padding-box 指背景会出现在内容区和内边距
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .login_title{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login_submit{
        margin: 10px auto 0px auto;
    }
}

</style>