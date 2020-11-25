<template>
  <div class="login-container">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide
        ><img class="img" src="../assets/images/9.jpg" alt=""
      /></swiper-slide>
      <swiper-slide
        ><img class="img" src="../assets/images/7.jpg" alt=""
      /></swiper-slide>
      <swiper-slide
        ><img class="img" src="../assets/images/8.jpg" alt=""
      /></swiper-slide>
    </swiper>
    <h1 class="header">ISSUE管理系统 / 注册</h1>
    <el-form
      :model="ruleForm1"
      :rules="rules1"
      status-icon
      ref="ruleForm1"
      label-position="left"
      label-width="80px"
      class="demo-ruleForm login-page"
    >
      <h2 class="title">注册</h2>
      <el-form-item prop="userid" label="系统ID">
        <el-input
          type="text"
          v-model="ruleForm1.userid"
          auto-complete="off"
          placeholder="系统ID"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input
          type="text"
          v-model="ruleForm1.name"
          auto-complete="off"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input
          type="text"
          v-model="ruleForm1.email"
          auto-complete="off"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input
          type="text"
          placeholder="邮箱验证码"
          v-model="ruleForm1.code"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-message" @click="sendEmail"
            >发送验证码</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="输入密码">
        <el-input
          type="password"
          v-model="ruleForm1.password"
          auto-complete="off"
          placeholder="输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" label="确认密码">
        <el-input
          type="password"
          v-model="ruleForm1.checkPassword"
          auto-complete="off"
          placeholder="确认密码"
          show-password
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
      <el-link type="primary" class="toLogin" @click="toLogin"
        >已有账号？去登录</el-link
      >
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          class="el-btn"
          >注册</el-button
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
    // 校验userid是否已经存在于数据库
    var validateIsExistId = (rule, value, callback) => {
      // axios发送post请求，查询系统ID是否已存在于数据库
      axios
        .post("/api/isExistId", {
          userid: this.ruleForm1.userid,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data) {
            // 数据库中已存在该系统ID
            this.$message({
              message: "系统ID已存在，请重新输入！",
              type: "warning",
            });
            this.isExistId = true;
            callback(new Error("系统ID已存在！"));
          } else {
            // 数据库中不存在该系统ID，可继续注册
            this.isExistId = false;
            callback();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 校验邮箱验证码
    var validateCode = (rule, value, callback) => {
      if (this.emailCode == "") {
        callback(new Error("请发送邮箱验证码"));
      } else if (this.ruleForm1.code != this.emailCode) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };

    // 密码校验规则，8-30位，必须同时包含大小写和特殊字符
    var regex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}");
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regex.test(this.ruleForm1.password)) {
        callback(new Error("字符长度在8-30位之间,且必须包含大小写和特殊字符"));
      } else {
        callback();
      }
    };

    // 两次密码一致性的校验规则
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm1.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 数据
    return {
      //swiper 初始化
      swiperOption: {
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      },
      isExistId: false,
      logining: false,
      emailCode: "",
      ruleForm1: {
        id: "",
        name: "",
        email: "",
        code: "",
        password: "",
        checkPassword: "",
      },
      rules1: {
        userid: [
          // 不为空验证
          {
            required: true,
            message: "请输入您要注册的ID",
            trigger: "change",
          },
          // 字符长度验证
          {
            message: "ID必须限制在30个字符以内",
            max: 30,
            trigger: "change",
          },
          // userid是否已存在于数据库的验证
          {
            validator: validateIsExistId,
            trigger: "change",
          },
        ],
        name: [
          // 不为空验证
          {
            required: true,
            message: "请输入您的姓名",
            trigger: "change",
          },
          // 字符长度验证
          {
            max: 20,
            message: "长度必须限制在20字符以内",
            trigger: "change",
          },
        ],
        email: [
          // 不为空验证
          {
            required: true,
            message: "请输入您的邮箱",
            trigger: "change",
          },
          // 字符长度验证
          {
            message: "请输入正确的邮箱且长度限制在30字符以内",
            type: "email",
            max: 30,
            trigger: "change",
          },
        ],
        code: [
          // 不为空验证
          {
            required: true,
            message: "请输入邮箱验证码",
            trigger: "change",
          },
          // 邮箱验证码的验证
          {
            validator: validateCode,
            trigger: "change",
          },
        ],
        password: [
          // 不为空验证
          {
            required: true,
            message: "请输入您的密码",
            trigger: "change",
          },
          // 密码8-30位，且必须包含大小写和特殊字符的验证
          {
            validator: validatePass,
            trigger: "change",
          },
        ],
        checkPassword: [
          // 密码不为空验证
          {
            required: true,
            message: "请输入您的密码",
            trigger: "change",
          },
          // 两次密码一致性验证
          {
            validator: validatePass2,
            trigger: "change",
          },
        ],
      },
      checked: false,
    };
  },
  methods: {
    // 点击注册的处理函数
    handleSubmit(event) {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          axios
            .post("/api/register", {
              userid: this.ruleForm1.userid,
              name: this.ruleForm1.name,
              password: this.ruleForm1.password,
              email: this.ruleForm1.email,
            })
            .then((res) => {
              console.log(res);
              this.logining = false;
              this.$message({
                message: "恭喜你，注册成功！",
                type: "success",
              });
              // 把用户名添加进sessionStorage中,并跳转到系统主页面
              // sessionStorage.setItem("name", this.ruleForm1.name);
              this.$router.push({ path: "/login" });
            })
            .catch((err) => {
              console.log(err);
              this.logining = false;
            });
        } else {
          console.log("error submit!");
          this.$alert("请检查您的输入", "输入有误", {
            confirmButtonText: "ok",
            type: "warning",
          });
          return false;
        }
      });
    },
    // 发送邮箱验证码
    sendEmail() {
      axios
        .post("/api/sendEmail", {
          mailTo: this.ruleForm1.email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            this.emailCode = res.data;
            this.$message({
              message: "邮件发送成功啦 ‎|•'-'•)و✧",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 路由跳转 -> 跳转到登录页面
    toLogin() {
      this.$router.push("/login");
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
    margin-top 20px
    text-align center
    color #fff
    position absolute
    z-index 5
    top 0
    bottom 0
    left 0
    right 0
    animation bounceInLeft
    animation-duration 1.25s
  .title
    text-align center
    color #409eff
  .login-page
    -webkit-border-radius 5px
    border-radius 5px
    margin 20px auto 20px
    width 380px
    height 540px
    padding 15px 35px 15px
    background #fff
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
    position absolute
    z-index 5
    top 10%
    bottom 0
    left 0
    right 0
    animation bounceInLeft
    animation-duration 1.25s
  .toLogin
    margin-bottom 10px
label.el-checkbox.rememberme
  margin 0px 0px 15px
  text-align left
.el-btn
  margin-left -40px
</style>
