<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ECharts",
  props: {
    isAxisChart: {
      //区分是柱状图、折线图还是饼图,true 为柱状图或折线图的配置，false 为饼图配置
      type: Boolean,
      default: true,
    },
    chartData: {
      //接收传递的option参数
      type: Object,
      default() {
        return {
          xData: [], //x轴数据
          series: [], //  每个图例对应的当前数据
        };
      },
    },
  },
  data() {
    return {
        // 判断echart是否渲染
        echart: null,
        // 折线图的option配置
        axisOption:{
            legend: {
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
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
                data: [],
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
            color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
            series: [],
        },
        // 饼图的option配置
        normalOption:{
            tooltip: {
                trigger: "item",
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
            series: [],
        },
    }
  },
  watch:{
    chartData:{ //当option参数发生改变，就要重新绘制
        deep:true,
        handler() {
            this.initChart()
        }
    },
  },
  methods: {
    initChart() {
        this.initChartData()
        // 当echart存在，就直接进行渲染，注echart 为初始化echarts实例
        if(this.echart) {
            // 注意options 为计算属性
            this.echart.setOption(this.options)
        } else { //当echart不存在,需要自行初始化
            this.echart = echarts.init(this.$refs.echart)
            this.echart.setOption(this.options)
        }
    },
    // 对option数据中的 x轴数据和series数据进行处理
    initChartData() {
        if(this.isAxisChart) {
            // 如果是柱状图或折线图，则x轴数据 就为 chartData中xData
            this.axisOption.xAxis.data = this.chartData.xData
            // 如果是柱状图或折线图，则series为传入的series
            this.axisOption.series = this.chartData.series
        } else {
            // 如果是饼图，则series为传入的series,没有x轴数据
            this.normalOption.series = this.chartData.series
        }
    },
  },
  computed: {
    options() {
        return this.isAxisChart ? this.axisOption : this.normalOption
    },
  },
};
</script>

<style>
</style>