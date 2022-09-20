<template>
  <el-row class="home" :gutter="20">
    <!-- 第一列 -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- 第一个card，显示用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="用户头像" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <!-- 第二个card，显示列表数据 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 第二列 -->
    <el-col :span="16" style="margin-top: 20px">
      <!-- 一个块，6个card，显示countData -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: '0' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ backgroundColor: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 单独一个card 显示折线图-->
      <el-card style="height: 280px">
        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
        <!-- <div style="height: 280px" ref="echarts"></div> -->

        <Echart :chartData="echartData.order" style="height: 280px"  />
      </el-card>

      <!-- 最后一块，2个card 显示柱状图和饼图-->
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->

          <Echart :chartData="echartData.user" style="height: 240px"  />
        </el-card>

        <!-- 饼图 -->
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->

          <Echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/../api/data.js";
import * as echarts from "echarts";
import Echart from '@/components/ECharts.vue'

export default {
  name: "Home",
  components:{Echart},
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      // 折线图、柱状图和饼图的相关数据
      echartData:{
        order:{ //折线图
          xData:[],
          series:[]
        },
        user:{ //柱状图
          xData:[],
          series:[]
        },
        video:{ //饼图
          series:[]
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      // console.log(res);
      const { code, data } = res.data;
      if (code === 20000) {
        // ----------列表card中的数据---------------
        // 获取tableData数据
        this.tableData = data.tableData;

        // ----------销售品牌折线图--------------------
        // 折线图数据
        const order = data.orderData;
        // x轴横坐标数据
        const xData = order.date;
        // 图例名称（苹果，vivo,oppo,魅族，三星）
        const keyArray = Object.keys(order.data[0]);
        //  每个图例对应的当前数据
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key, //图例名称
            data: order.data.map((item) => item[key]), //x轴对应的数据
            type: "line", //图的类型，line表示折线图
          });
        });
/*         // 图表的配置项和数据
        const option = {
          //  x轴
          xAxis: {
            data: xData,
          },

          //  y轴
          yAxis: {},

          //  图例
          legend: {
            data: keyArray,
          },

          //  提示框,鼠标移动到对应节点，显示对应信息
          tooltip: {},

          // 图例对应的当前数据
          series,
        };
        // 基于准备好的dom，初始化echarts实例
        const E = echarts.init(this.$refs.echarts);
        // 使用刚指定的配置项和数据显示图表
        E.setOption(option); */

        // 使用ECharts组件，折线图需要传递的数据赋值
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        // -----------用户柱状图----------------
/*         const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
            // 数据，图例名称
            data:['新增用户','活跃用户']
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:'新增用户',
              data:data.userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item => item.active),
              type:'bar'
            },
          ],
        };

        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption) */

        // 使用ECharts组件，用户柱状图需要传递的数据赋值
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name:'新增用户',
              data:data.userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item => item.active),
              type:'bar'
            },
          ]


        // -------------饼图-----------------
/*         const videoOption = {
          // 显示提示框组件
          tooltip: {
            trigger: "item", //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:data.videoData,
              type:'pie'
            }
          ],
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption) */

        // 使用ECharts组件，饼图需要传递的数据赋值
        this.echartData.video.series = [
            {
              data:data.videoData,
              type:'pie'
            }
          ]
      }
    });
  },
};
</script>

<style>
</style>