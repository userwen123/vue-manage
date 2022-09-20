<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      size="small"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain' "
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >
        {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
    }),
  },
  methods: {
    // 未开启命名空间，就不要用 ...mapMutations('tab',['closeTag']),
    ...mapMutations(['closeTag']),
    // ...mapMutations({
    //     close : 'closeTag'
    // }),
    // 点击面包屑切换页面
    changeMenu(tag) {
        // 编程式导航
        this.$router.push({
            name:tag.name
        })
    },
    // 删除面包屑,tag是点击的面包屑，index是点击的面包屑的索引
    handleClose(tag,index) {
        const length = this.tags.length - 1
        this.closeTag(tag)
        // this.close(Tag)
        // 如果点击的面包屑的名称与当前路由的名称不同，则不需要改变高亮部分，直接返回
        if(tag.name !== this.$route.name) {
            return;
        }
        // 如果点击叉掉的是最后一个面包屑，则高亮部分左移一位，即当前点击tag的前一位，可用this.tags[index - 1].name表示
        if(index === length) {
            this.$router.push({
                name: this.tags[index - 1].name
            })
        } else { 
            // 如果点击叉掉的不是是最后一个面包屑，而是中间的，则高亮部分右移一位
            this.$router.push({
                // 注意这里是index 而不是index+1，因为叉掉一个后，当前叉掉的tag的后一个的索引就是index
                name: this.tags[index].name
            })
        }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        // 鼠标移在面包屑tag上，鼠标由箭头变为手的样式
        cursor: pointer;
    }
}
</style>