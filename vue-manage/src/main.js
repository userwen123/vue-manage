import Vue from 'vue'
import App from './App.vue'
// 完整引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// 按需引入
// import { Button,Radio } from 'element-ui';
import {MessageBox,Message} from 'element-ui'
// 自己写了一个插件来按需引入element-ui组件
import getEle from '@/plugins'


import './assets/less/index.less'

import router from '../router'

import store from '../store'

import http from 'axios'

import '../api/mock'

Vue.config.productionTip = false
// Vue.use(ElementUI);
// Vue.use(Button)
// Vue.use(Radio)
getEle(Vue)

Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 路由的动态添加,避免刷新出现白屏，因此每次刷新，在vue实例生成前都重新添加一次动态路由
    store.commit('addMenu',router)
  },
}).$mount('#app')
