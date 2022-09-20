import store from '../store'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Main',
        redirect:'/home',  //重定向
        component:() => import('../views/Main.vue'),
        children:[
            /* {
                path:'home',
                name:'home',
                component:() => import('../views/Home')
            },
            {
                path:'mall',
                name:'mall',
                component:() => import('../views/Mall')
            },
            {
                path:'user',
                name:'user',
                component:() => import('../views/User')
            },
            {
                path:'page1',
                name:'page1',
                component:() => import('../views/Other/pageOne')
            },
            {
                path:'page2',
                name:'page2',
                component:() => import('../views/Other/pageTwo')
            }, */
        ],
    },
    {
        path:'/login',
        name:'login',
        component:() => import('../views/Login/login.vue')
    },
]

const router = new VueRouter({
    mode:'history',
    routes,
})

// 设置全局路由守卫，当token不存在时，也就是没有登录时，输入地址无法进入系统
router.beforeEach((to,from,next) => {
    store.commit('getToken')
    const token = store.state.user.token
    if(!token && to.name !== 'login') {  //未登录状态下不能访问系统
        next({name:'login'})
    } else if(token && to.name === 'login'){ //登录成功后就不能访问登录页
        next({name:'home'})
    } else {
        next()
    }
}) 

export default router