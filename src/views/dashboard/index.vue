<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">技术栈</h1>
        <p class="description">
          包含: Hadoop, hdfs, MapReduce, Zookeeper, flume/Ganglia, sqoop,
          Azkaban, nginx, redis, mysql, nacos, sentinal, JVM, Spring, Spring
          Boot, Spring Cloud, ElasticSearch, Docker, Vue-Cli
        </p>
      </el-col>
      <el-col :span="10">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img" />
    </el-dialog>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "Dashboard",
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
      ewizardClap:
        "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646",
      dialogVisible: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.errPage-container {
  h1 {
    padding-bottom: 1rem;
    border-bottom: 1px solid #eaecef;
  }
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .description {
    max-width: 35rem;
    font-size: 1.6rem;
    line-height: 1.3;
    color: #6a8bad;
  }
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
