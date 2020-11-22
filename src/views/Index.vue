<template>
  <div class="index">
    <div class="time">当前时间：{{ nowTime | formatDate }}</div>
    <div class="title">
      Welcome, <span>{{ username }}！</span>
    </div>
    <div class="display flex1">
      <span class="allData">数据统计</span>
      <div class="item">
        <span>待解决Issue数</span>
        <span class="num" id="userNum"></span>
      </div>
      <div class="item">
        <span>待验证Issue数</span>
        <span class="num" id="userNum"></span>
      </div>
      <div class="item">
        <span>已关闭Issue数</span>
        <span class="num" id="userNum"></span>
      </div>
      <div class="item">
        <span>普通用户数</span>
        <span class="num" id="staffNum"></span>
      </div>
      <div class="item">
        <span>经理数</span>
        <span class="num" id="deptNum"></span>
      </div>
      <div class="item">
        <span>超级Admin数</span>
        <span class="num" id="postNum"></span>
      </div>
      <!-- <div class="item">
        <span>角色数</span>
        <span class="num" id="roleNum"></span>
      </div>
      <div class="item">
        <span>公告数</span>
        <span class="num" id="noticeNum"></span>
      </div>
      <div class="item">
        <span>文件数</span>
        <span class="num" id="fileNum"></span>
      </div> -->
    </div>
    <div class="display">
      <span class="allData">系统信息</span>
      <div class="content">
        <div class="name">开发语言</div>
        <div class="answer">Java HTML CSS JavaScript</div>
      </div>
      <div class="content">
        <div class="name">框架</div>
        <div class="answer">Vue(前端) SpringBoot Mybatis(后端)</div>
      </div>
      <div class="content">
        <div class="name">UI组件库</div>
        <div class="answer">ElementUI</div>
      </div>
      <div class="content">
        <div class="name">操作系统</div>
        <div class="answer">win10</div>
      </div>
      <div class="content">
        <div class="name">数据库</div>
        <div class="answer">MySQL5.7</div>
      </div>
      <div class="content">
        <div class="name">服务器</div>
        <div class="answer">Tomcat9.0</div>
      </div>
      <div class="content">
        <div class="name">Java环境</div>
        <div class="answer">JDK 1.8</div>
      </div>
    </div>
    <div class="display">
      <span class="allData">开发团队</span>
      <div class="content">
        <div class="name">前端开发</div>
        <div class="answer">蔡梓杰、钟浩</div>
      </div>
      <div class="content">
        <div class="name">后端开发</div>
        <div class="answer">黄健超、黄金全、何柏祥</div>
      </div>
      <div class="content">
        <div class="name">测试</div>
        <div class="answer">刘健丰、陈祝愿、陈世明</div>
      </div>
    </div>
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
      // 最好别放这，多次加载耗性能
      const weekday = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      //创建一个时间日期对象
      var date = new Date();
      var year = date.getFullYear(); //存储年
      var month = padaDate(date.getMonth() + 1); //存储月份
      var day = padaDate(date.getDate()); //存储日期
      var hours = padaDate(date.getHours()); //存储时
      var minutes = padaDate(date.getMinutes()); //存储分
      var seconds = padaDate(date.getSeconds()); //存储秒
      var today = weekday[date.getDay()]; //存储星期几信息
      //返回格式化后的日期 + 星期几
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
        "秒 " +
        today
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
    // 清除定时器
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  },
};
</script>
<style lang="stylus" scoped>
.index
  position relative
  .title
    font-size 33px
    font-weight 600
    color #2c3a47
    border-left 10px solid #6c5ce7
    margin-left 10px
    padding-left 10px
    span
      font-size 24px
      color #6c5ce7
  .time
    font-size 26px
    float right
    color #e056fd
  .display
    position relative
    padding 20px
    border 4px solid #1e90ff
    border-radius 12px
    margin-top 35px
    .allData
      position absolute
      top -14px
      left 18px
      font-size 20px
      background-color #fff
      padding 0 6px 0
    .item
      font-size 18px
      position relative
      flex 2
      display flex
      flex-direction column
      text-align center
      span
        color #84817a
        padding 8px
        flex 1
      .num
        font-size 32px
        color #7158e2
    .content
      display flex
      .name
        flex 1
        padding 10px
        font-size 18px
        font-weight 700
      .answer
        padding 10px
        font-size 18px
        flex 10
  .flex1
    display flex
</style>