<template>
  <div class="login-container">
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
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
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
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
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
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "admin",
        password: "123456",
      },
      rules2: {
        username: [
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
          if (
            this.ruleForm2.username === "admin" &&
            this.ruleForm2.password === "123456"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.ruleForm2.username);
            this.$router.push({ path: "/" });
          } else {
            this.logining = false;
            this.$alert("username or password wrong!", "info", {
              confirmButtonText: "ok",
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.login-container
  width 100%
  height 100%
  background-image url('../../src/assets/images/backgroundImg.jpg')
  background-repeat no-repeat
  background-attachment fixed
  background-size 100% 100%
  z-index 99
  overflow hidden
  .header
    margin-top 40px
    text-align center
    color #fff
  .title
    text-align center
  .login-page
    -webkit-border-radius 5px
    border-radius 5px
    margin 100px auto 180px
    width 350px
    padding 35px 35px 15px
    background #fff
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
label.el-checkbox.rememberme
  margin 0px 0px 15px
  text-align left
</style>