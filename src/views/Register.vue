<template>
  <div class="login-container">
    <h1 class="header">ISSUE管理系统 / 注册</h1>
    <el-form
      :model="ruleForm1"
      :rules="rules2"
      status-icon
      ref="ruleForm1"
      label-position="left"
      label-width="80px"
      class="demo-ruleForm login-page"
    >
      <h2 class="title">注册</h2>
      <el-form-item prop="id" label="系统ID">
        <el-input
          type="text"
          v-model="ruleForm1.id"
          auto-complete="off"
          placeholder="系统ID"
        ></el-input>
      </el-form-item>
      <el-form-item prop="username" label="姓名">
        <el-input
          type="text"
          v-model="ruleForm1.username"
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
      <el-form-item prop="password" label="输入密码">
        <el-input
          type="password"
          v-model="ruleForm1.password"
          auto-complete="off"
          placeholder="输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" label="确认密码">
        <el-input
          type="password"
          v-model="ruleForm1.checkPassword"
          auto-complete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
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
export default {
  data() {
    // 密码校验规则，8-30位，必须同时包含大小写和特殊字符
    var regex = new RegExp("(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}");
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
      logining: false,
      ruleForm1: {
        id: "",
        username: "admin",
        email: "",
        password: "123456",
        checkPassword: "123456",
      },
      rules2: {
        id: [
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
        ],
        username: [
          // 不为空验证
          {
            required: true,
            message: "请输入您的系统ID",
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
    handleSubmit(event) {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          this.logining = true;
          if (
            this.ruleForm1.username === "admin" &&
            this.ruleForm1.password === "123456"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.ruleForm1.username);
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
    margin 50px auto 100px
    width 380px
    padding 35px 35px 15px
    background #fff
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
label.el-checkbox.rememberme
  margin 0px 0px 15px
  text-align left
.el-btn
  margin-left -40px
</style>