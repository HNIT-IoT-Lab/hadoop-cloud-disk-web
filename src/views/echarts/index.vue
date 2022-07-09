<template>
  <div class="dashboard-container">
    <panel-group :userLog="userLog" />
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <pie-echarts :userLog="userLog" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <bar-echarts :userLog="userLog" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieEcharts from "./components/PieEcharts.vue";
import BarEcharts from "./components/BarEcharts.vue";
import PanelGroup from "./components/PanelGroup.vue";
import { queryLog } from "../../api/fileList";
export default {
  name: "Echarts",
  components: {
    PieEcharts,
    BarEcharts,
    PanelGroup,
  },
  data() {
    return {
      userLog: {},
    };
  },
  mounted() {
    this.handQueryLog();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    handQueryLog() {
      queryLog().then(
        (res) => {
          if (res.code === 200) {
            this.userLog = res.data;
          }
        },
        (err) => {
          this.$message.error(err);
        }
      );
    },
  },
};
</script>

<style></style>
