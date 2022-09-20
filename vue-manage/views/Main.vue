<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- <CommonHeader></CommonHeader> -->
        <!-- <common-header></common-header> -->
        <common-header/>
      </el-header>

      <!-- 面包屑 -->
      <common-tag></common-tag>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'

export default {
  name: "Home",
  components:{CommonAside,CommonHeader,CommonTag},
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header{
  background-color: #333;
}
.el-main{
  margin-top: 0;
  padding-top: 0;
}
</style>