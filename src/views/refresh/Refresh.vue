<template>
  <div></div>
</template>
<script>
export default {
  // 用来刷新当前页面的路由
  name: "Refresh",
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.replace(from.path);
    });
  },
};
</script>
<style lang="stylus" scoped></style>