<template>
  <div>
    <!-- 图表 -->
    <div class="vol-data">
      <div class="box1">
        <div id="issueChart" class="issueChart"></div>
      </div>
      <div class="box1">
        <div id="UserChart" class="UserChart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    /*ECharts图表*/
    // 颜色
    var colorList1 = ["#0fbcf9", "#e056fd", "#FCCE10"];
    var colorList2 = ["#4cd137", "#5D84FF", "#ff6b6b", "#ff7979", "#F3A43B"];
    var issueChart = echarts.init(document.getElementById("issueChart"));
    var UserChart = echarts.init(document.getElementById("UserChart"));
    // 请求获取统计数据的函数
    axios.post("/api/getAll").then((res) => {
      issueChart.setOption({
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        color: colorList1,
        title: {
          text: "Issue统计",
          subtext: "",
          x: "center",
          textStyle: {
            fontSize: 30,
            fontWeight: "bolder",
            color: "#c56cf0", // 主标题文字颜色
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "MySQL数据库",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            data: [
              { value: res.data.createNum, name: "待解决Issue数" },
              { value: res.data.modefiNum, name: "待验证Issue数" },
              { value: res.data.finishNum, name: "已关闭Issue数" },
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} :\n {c} ({d}%)",
                },
                labelLine: { show: true },
              },
            },
          },
        ],
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          data: ["待解决Issue数", "待验证Issue数", "已关闭Issue数"],
        },
        textStyle: {
          fontSize: 16, //字体大小
        },
      });
      UserChart.setOption({
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        color: colorList2,
        title: {
          text: "用户统计",
          subtext: "",
          x: "center",
          textStyle: {
            fontSize: 30,
            fontWeight: "bolder",
            color: "#409eff", // 主标题文字颜色
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            // name: "数据来源",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            data: [
              { value: res.data.commonNum, name: "普通用户数" },
              { value: res.data.manageNum, name: "经理数" },
              { value: res.data.adminNum, name: "超级Admin数" },
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} :\n {c} ({d}%)",
                },
                labelLine: { show: true },
              },
            },
          },
        ],
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          data: ["普通用户数", "经理数", "超级Admin数"],
        },
        textStyle: {
          fontSize: 19, //字体大小
        },
      });
    });
  },
};
</script>
<style lang="stylus" scoped>
.vol-data
  // background-image url('../../assets/images/10.png')
  background-size cover
  width 100%
  height 100%
  // position relative
  box-shadow 0px 0px 30px 30px black inset, overflow hidden, .box1
    // position absolute
    float left
    width 600px
    height 600px
  .issueChart
    width 100%
    height 100%
    float left
  .UserChart
    width 100%
    height 100%
    float left
    // background-image radial-gradient(closest-side at 50% 50%, black, white, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))
</style>
