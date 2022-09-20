<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path+''" :key="item.path">
      <i :class="'el-icon-'+ item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+ item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex+'' ">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
   data() {
      return {
        menu:[],
        // 直接根据登录账号来显示不同的菜单，动态传入菜单，拿到store中的menu数据
       /*  menu:[
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
        ], */

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        // 路由控制跳转到该页面
        this.$router.push({
            name:item.name,
        })
        // 面包屑功能，将跳转页面的相关数据存到vuex
        this.$store.commit('selectMenu',item)
      },
    },
    computed:{
      // 动态传入菜单
        asyncMenu() {
          return this.$store.state.tab.menu
        },
      // 没有二级菜单
        noChildren(){
           return this.asyncMenu.filter(item => !item.children)
        },
        // 有二级菜单
        hasChildren(){
            return this.asyncMenu.filter(item => item.children)
        },
        // 是否收缩侧边栏
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
    },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100%;
    border: none;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
}
</style>