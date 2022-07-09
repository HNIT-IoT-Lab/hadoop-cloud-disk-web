<template>
  <!-- 柱状图 -->
  <div
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
      userLogData: this.userLog,
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
      let option = {
        xAxis: {
          type: "category",
          data: ["查询网盘", "登录网盘", "上传文件", "下载文件"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [
          {
            data: [
              newVal.loginNum,
              newVal.queryNetworkNum,
              newVal.downLoadNum,
              newVal.uploadNum,
            ],
            type: "bar",
          },
        ], //配置项
      };
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
