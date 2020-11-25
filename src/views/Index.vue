<template>
  <div class="index">
    <div class="time">{{ nowTime | formatDate }}</div>
    <div class="test-clock-container">
      <flip-clock />
    </div>
    <div class="title">
      Welcome, <span>{{ username }}！</span>
    </div>
    <div class="display flex1">
      <span class="allData">数据统计</span>
      <div class="item">
        <span>待解决Issue数</span>
        <span class="num">{{ createNum }}</span>
      </div>
      <div class="item">
        <span>待验证Issue数</span>
        <span class="num">{{ modefiNum }}</span>
      </div>
      <div class="item">
        <span>已关闭Issue数</span>
        <span class="num">{{ finishNum }}</span>
      </div>
      <div class="item">
        <span>普通用户数</span>
        <span class="num">{{ commonNum }}</span>
      </div>
      <div class="item">
        <span>经理数</span>
        <span class="num">{{ manageNum }}</span>
      </div>
      <div class="item">
        <span>超级Admin数</span>
        <span class="num">{{ adminNum }}</span>
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
import FlipClock from "kuan-vue-flip-clock";
import axios from "axios";

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
      // 数据统计的数据
      createNum: "",
      modefiNum: "",
      finishNum: "",
      commonNum: "",
      manageNum: "",
      adminNum: "",
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
      // var hours = padaDate(date.getHours()); //存储时
      // var minutes = padaDate(date.getMinutes()); //存储分
      // var seconds = padaDate(date.getSeconds()); //存储秒
      return (
        year + "年" + month + "月" + day + "日"
        //  +
        // hours +
        // "时" +
        // minutes +
        // "分" +
        // seconds +
        // "秒 "
      );
    },
  },
  methods: {
    // 请求获取统计数据的函数
    getAll() {
      axios
        .post("/api/getAll")
        .then((res) => {
          console.log(res);
          this.createNum = res.data.createNum;
          this.modefiNum = res.data.modefiNum;
          this.finishNum = res.data.finishNum;
          this.commonNum = res.data.commonNum;
          this.manageNum = res.data.manageNum;
          this.adminNum = res.data.adminNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    FlipClock,
  },
  mounted() {
    // 定时器
    var _this = this;
    _this.timeId = setInterval(() => {
      _this.nowTime = new Date();
    }, 1000);
    // 请求获取统计模块的数据
    this.getAll();
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
  .test-clock-container
    // float right
    margin-bottom 30px
    font normal 12px 'Helvetica Neue', Helvetica, sans-serif
    user-select none
    text-shadow 0 1px 0 rgba(0, 0, 0, 0.3)
    max-height 10vh
    display flex
    align-items center
    justify-content center
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
    font-size 36px
    line-height 65px
    font-weight 900
    float right
    margin-right 10px
    color #00a8ff
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