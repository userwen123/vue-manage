<template>
  <div class="manage">
    <!-- operateType判断标题是是新增用户还是更新用户 -->
    <!-- 点击新增按钮或者修改按钮后，弹出的对话框，提示要修改的或者新增的内容 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible="isShow"
    >
      <!-- 根据传入的数据形成对话框中的表单 -->
      <common-form 
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <!-- 对话框中的取消和确定按钮 -->
      <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <!-- user组件顶部的新增按钮和搜索框 -->
    <div class="manage-header">
      <!-- 左边的新增按钮 -->
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <!-- 右边的搜索框 -->
      <common-form 
      :formLabel="formLabel"
      :form="searchForm"
      :inline="true"
      ref="form"
      >
        <!-- 搜索按钮，实际上是在CommonForm组件的插槽中 -->
        <!-- searchForm.keyword 是搜索框输入的内容 -->
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
      
    </div>

    <!-- table组件---用户列表 -->
    <!-- 
      自定义事件
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></common-table>

  </div>
</template>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import {getUser} from "../../api/data.js";


export default {
  name: "User",
  components: { CommonForm, CommonTable },
  data() {
    return {
      operateType: "add",  //操作类型
      isShow: false, //false表示不显示dialog对话框
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm:{
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      },
      formLabel:[
        {
          model:'keyword',
          label:'',
          type:'input'
        }
      ],
      searchForm:{
        keyword:''
      },
      tableData:[],
      tableLabel:[
        {
          prop:"name",
          label:"姓名"
        },
        {
          prop:"age",
          label:"年龄"
        },
        {
          prop:"sexLabel",
          label:"性别"
        },
        {
          prop:"birth",
          label:"出生日期",
          width:200
        },
        {
          prop:"addr",
          label:"地址",
          width:320
        },
      ],
      // 当前页面数
      config:{
        page:1,
        total:30
      },
    };
  },
  methods: {
    // 点击确定，新增用户或者更新用户
    confirm() {
      // 判断弹出的对话框是新增还是编辑
      if(this.operateType === 'edit') {  //编辑
        // 获取接口数据
        this.$http.post('/user/edit',this.operateForm).then(res => {
          console.log(res)
          // 关闭弹窗
          this.isShow = false
          // 更新table数据，重新获取用户列表数据，将列表重置
          this.getList()
        })
      } else {  //新增
      //  console.log(this.operateForm)
        this.$http.post('/user/add',this.operateForm).then(res => {
          console.log(res)
          // 关闭弹窗
          this.isShow = false
          // 更新table数据，重新获取用户列表数据，将列表重置
          this.getList()
        })
      }
    },
    // 点击按钮后，弹出dialog对话框，填写用户相关信息
    addUser() {
      // 点击新增按钮，打开dialog对话框
      this.isShow = true
      // 并且因为点击的是新增按钮，因此标题要显示'新增用户'
      this.operateType = 'add'
      // 将operateForm进行初始化，否则如果不初始化，会保留上次提交的信息
      this.operateForm = {
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      }
    },
    // 搜索功能
    getList(name = '') {
      // loading 属性显示是否处在加载中
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        // 实现分页功能
        page:this.config.page,
        // 实现搜索功能
        name
      }).then(({data:res}) => {
        // {data:res} 解构赋值，原本数据res是一个对象，list和count都在res中的data中，即 res{data:{list:[],count:...}}
        // 这里相当于把data提出来，然后重命名为res
        console.log(res)

        // 给tableData赋值
        this.tableData = res.list.map(item => {
          // 对性别进行处理
          item.sexLabel = item.sex === 0 ? "女" : "男"

          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    // 编辑用户
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      // 点击编辑按钮，打开对话框，需要回显当前行的数据
      this.operateForm = row
    },
    // 删除用户
    delUser(row) {
      // elementUI组件库  MessageBox 弹框  确认消息   
      this.$confirm("此操作将永久删除该组件，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(() => {
          const id = row.id
          this.$http.post("/user/del",{
            params:{id}
          }).then(() => {
            // elementUI组件库  Message消息提示
            this.$message({
              type:"success",
              message:"删除成功"
            })
            // 将列表数据刷新
            this.getList()
          })
      })
    },
  },
  created() {
    // 页面一挂载就必须请求数据
    this.getList()
  }
};
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>