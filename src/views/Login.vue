<template>
  <div class="login-container">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide
        ><img class="img" src="../assets/images/1.jpg" alt=""
      /></swiper-slide>
      <swiper-slide
        ><img class="img" src="../assets/images/2.jpg" alt=""
      /></swiper-slide>
      <swiper-slide
        ><img class="img" src="../assets/images/3.jpg" alt=""
      /></swiper-slide>
    </swiper>
    <h1 class="header">ISSUE管理系统 / 登录</h1>
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h2 class="title">系统登录</h2>
      <el-form-item prop="userid">
        <el-input
          type="text"
          v-model="ruleForm2.userid"
          auto-complete="off"
          placeholder="系统ID"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="密码"
          show-password
          @keyup.enter.native="handleSubmit"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
      <el-link type="primary" class="toRegister" @click="toRegister"
        >没有账号？去注册</el-link
      >
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  data() {
    return {
      //swiper 初始化
      swiperOption: {
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      },
      // 内容
      logining: false,
      passw: "password",
      ruleForm2: {
        userid: "",
        password: "",
      },
      rules2: {
        userid: [
          {
            required: true,
            message: "请输入您的系统ID",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          this.judgeLogin();
        } else {
          // console.log("error submit!");
          this.$alert("请检查您的输入", "输入有误", {
            confirmButtonText: "ok",
          });
          return false;
        }
      });
    },
    // 登录请求
    judgeLogin() {
      // console.log(this.ruleForm2.userid);
      axios
        .post(
          "/api/login",
          {
            userid: this.ruleForm2.userid,
            password: this.ruleForm2.password,
          },
          {
            timeout: 7000,
          }
        )
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data.name);
          // console.log(res.data.flag);
          // console.log(res.data.url);
          // 1 登录成功  0 用户不存在 -1 密码错误 2 用户已注销
          switch (res.data.flag) {
            case "1":
              sessionStorage.setItem("userid", this.ruleForm2.userid);
              sessionStorage.setItem("name", res.data.name);
              sessionStorage.setItem("permission", res.data.permission);
              sessionStorage.setItem("url", res.data.url);
              this.$router.push({ path: "/" });
              break;
            case "0":
              this.$alert(
                "系统ID不存在，去注册一个账号吧 ⌯'ㅅ'⌯ ",
                "用户不存在",
                {
                  confirmButtonText: "ok",
                  type: "error",
                }
              );
              this.$router.replace({ path: "/refresh" });
              break;
            case "-1":
              this.$alert("请检查您的密码 (๑•.•๑)", "密码错误", {
                confirmButtonText: "ok",
                type: "warning",
              });
              this.$router.push({ path: "/refresh" });
              break;
            case "2":
              this.$alert("该用户已注销 ( 0 x 0 )", "用户已注销", {
                confirmButtonText: "ok",
                type: "warning",
              });
              this.$router.push({ path: "/refresh" });
              break;
          }
        })
        .catch((err) => {
          // console.log(err);
          this.$alert("请检查服务端是否已开启", "登录失败", {
            confirmButtonText: "ok",
            showClose: false,
            type: "error",
          });
          this.$router.push({ path: "/refresh" });
        });
    },
    // 路由跳转 -> 跳转到注册页面
    toRegister() {
      this.$router.push("/register");
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped lang="stylus">
.login-container
  overflow scroll
  height 100%
  position relative
  .img
    display block
    height 700px
    width 100%
    background-size cover
    background-position center
    background-repeat no-repeat
  .header
    margin-top 40px
    text-align center
    color #fff
    position absolute
    z-index 5
    top 10%
    bottom 0
    left 0
    right 0
    animation flip
    animation-duration 1.25s
  .title
    text-align center
    color #409eff
  .login-page
    -webkit-border-radius 5px
    border-radius 5px
    margin 100px auto 180px
    width 350px
    height 300px
    padding 35px 35px 15px
    background #fff
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
    position absolute
    z-index 5
    border-radius 15px
    top 10%
    bottom 0
    left 0
    right 0
    animation flip
    animation-duration 1.25s
  .toRegister
    margin-bottom 10px
label.el-checkbox.rememberme
  margin 0px 0px 15px
  text-align left
</style>
