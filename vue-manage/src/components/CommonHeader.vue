<template>
  <header>
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" alt="用户头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <!-- 组件添加点击事件，加.native，表示是原生事件，而不是自定义 -->
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleMenu(){
        this.$store.commit('collapseMenu')
    },
    logOut() {
      // 退出登录,返回登录页
      // 清除token 和 menu路由数据
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login")
    },
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
};
</script>

<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
        //  ::v-deep 与 /deep/是一样的
        ::v-deep .el-breadcrumb__inner,
        /deep/.el-breadcrumb__inner:hover,
        /deep/.el-breadcrumb__item:last-child  .el-breadcrumb__inner:hover {
          color: #999;
        }

        /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
          color:#fff
        }
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>