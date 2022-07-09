<template>
  <iframe
    id="iframeContain"
    name="iframeContain"
    seamless
    scrolling="yes"
    :src="iframeURL"
  >
    您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
  </iframe>
</template>
<style lang="scss" scoped>
/** iframe样式 */
#iframeContain {
  width: 100%;
  height: 650px;
}
</style>
<script>
export default {
  /**
   * 数据
   */
  data() {
    return {
      iframeURL: "https://124.70.165.48:8443/index",
    };
  },
};
</script>
