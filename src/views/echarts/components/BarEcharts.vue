<template>
  <!-- 饼图 -->
  <div
    id="barId"
    ref="bar"
    :class="className"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons");
export default {
  props: ["userLog"],
  data() {
    return {
      className: "Bar",
      height: "400px",
      width: "600px",
      chart: "",
    };
  },
  watch: {
    userLog(newVal) {
      this.init(newVal);
    },
  },
  methods: {
    init(newVal) {
      //2.初始化
      this.chart = echarts.init(this.$refs.bar);
      //3.配置数据
      let option = (option = {
        title: {
          text: "用户行为统计",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: newVal.loginNum, name: "登录网盘" },
              { value: newVal.queryNetworkNum, name: "查询网盘" },
              { value: newVal.downLoadNum, name: "下载文件" },
              { value: newVal.uploadNum, name: "上传文件" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });

      // 4.传入数据
      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.Bar {
  /* position: absolute;
  top: 50%;
  left: 50%; */
  width: 100%;
  height: 100%;
  /* transform: translate(-50%, -50%); */
}
</style>
