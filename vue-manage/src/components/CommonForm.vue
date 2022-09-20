<template>
<!--label-width表单域标签的宽度 :model="form" 表单数据对象，model是el-form组件的一个属性，不同于v-model-->
  <!-- form表单 ，根据user组件传入的数据，形成表单项，组成user组件弹出的对话框中的表单-->
  <el-form
    ref="form"
    label-width="100px"  
    :model="form"
    :inline="inline"
  >
  <!-- :label="item.label"  标签文本 -->
  <!-- form表单项 -->
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <!-- 表单项中input框 -->
        <el-input 
          v-if="item.type === 'input'" 
          :placeholder="'请输入'+item.label"
          v-model="form[item.model]"
        ></el-input>

        <!-- 表单项中switch,滑动交换按钮 -->
        <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>

        <!-- 表单项中日期控件 value-format对控件中日期格式进行定义-->
        <el-date-picker 
            v-if="item.type === 'date'" 
            type="date" 
            value-format="yyyy-MM-dd" 
            placeholder="选择日期" 
            v-model="form[item.model]"
        ></el-date-picker>

        <!-- 表单项中下拉控件 -->
        <el-select
           v-if="item.type === 'select'"
           placeholder="请选择"
           v-model="form[item.model]"
        >
          <el-option
           v-for="item in item.opts"
           :key="item.value"
           :label="item.label"
           :value="item.value"
          ></el-option>
        </el-select>
    </el-form-item>

    <!-- 如果以上都不满足，就用插槽自定义传入内容 -->
    <el-form-item>
        <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  props: {
    // form的相关配置
    formLabel: Array,
    // form数据
    form: Object,
    // 表单布局,单行还是上下排列
    inline: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>

</style>