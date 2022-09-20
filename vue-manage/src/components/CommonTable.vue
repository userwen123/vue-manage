<template>
  <div class="common-table">
    <!-- 用户列表 -->
    <el-table :data="tableData" height="90%" stripe>
        <!-- 自己配置的一些列  自定义列模板   具体见elementUI 官方文档 table 自定义列模板 -->
        <!-- 
            :label="item.label"   列名
            :width="item.width ? item.width : 125"  宽度
            是该组件必须属性
         -->
        <el-table-column 
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"   
            :width="item.width ? item.width : 125"
        >
           <!-- 作用域插槽 -->
           <!-- 自定义接收当前列的相关配置 -->
           <!-- Table-column Scoped Slot 自定义列的内容，参数为 { row, column, $index } -->
            <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，具体见官方文档 -->
            <template slot-scope="scope">
                <!-- scope.row 是当前行，数据类型为Object -->
                <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
            </template>
        </el-table-column>

        <!-- 固定列，操作列 -->
        <el-table-column label="操作" min-width="180">
            <!-- 作用域插槽 -->
            <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，具体见官方文档  -->
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

    <!-- 分页组件 -->
    <!-- 设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，pager表示页码列表 -->
    <!-- page-size 每页显示条目个数，支持 .sync 修饰符 -->
    <el-pagination 
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    name:'CommonTable',
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object
    },
    methods: {
        // 编辑按钮，点击编辑，弹出更新用户对话框
        handleEdit(row) {
            // 触发父组件中的自定义事件
            this.$emit('edit',row)
        },
        // 删除按钮，删除该用户
        handleDelete(row) {
            this.$emit('del',row)
        },
        // currentPage 改变时会触发
        changePage() {
            this.$emit('changePage')
        },
    },
}
</script>

<style lang="less" scoped>
.common-table{
    /* calc函数动态计算长度值 */
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    // 分页组件
    .pager{  
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>