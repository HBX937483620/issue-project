<template>
  <div class="index">
    <h2>Welcome, {{ username }}！</h2>
    <h3>当前时间：{{ nowTime | formatDate }}</h3>
  </div>
</template>
<script>
// 小于10的数字前面补齐0，用于年月日时分秒
var padaDate = function (value) {
  return value < 10 ? "0" + value : value;
};

export default {
  name: "Index",
  props: {
    username: {
      type: String,
      default: "来访者",
    },
  },
  data() {
    return {
      nowTime: new Date(),
      timeId: null,
    };
  },
  filters: {
    //过滤时间，实现时间的格式化
    formatDate: function (value) {
      //创建一个时间日期对象
      var date = new Date();
      var year = date.getFullYear(); //存储年
      var month = padaDate(date.getMonth() + 1); //存储月份
      var day = padaDate(date.getDate()); //存储日期
      var hours = padaDate(date.getHours()); //存储时
      var minutes = padaDate(date.getMinutes()); //存储分
      var seconds = padaDate(date.getSeconds()); //存储秒
      //返回格式化后的日期
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日" +
        hours +
        "时" +
        minutes +
        "分" +
        seconds +
        "秒"
      );
    },
  },
  methods: {},
  mounted() {
    var _this = this;
    _this.timeId = setInterval(() => {
      _this.nowTime = new Date();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  },
};
</script>
<style lang="stylus" scoped></style>