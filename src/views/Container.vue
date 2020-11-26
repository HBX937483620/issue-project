<template>
  <div class="app">
    <el-container>
      <el-aside
        class="app-side app-side-left"
        :width="isCollapse ? '66px' : '230px'"
      >
        <div class="app-side-logo">
          <img
            src="@/assets/issue-pkq.png"
            :width="isCollapse ? '60' : '60'"
            height="60"
          />
        </div>
        <div>
          <el-menu
            :default-active="$route.path"
            router
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <el-menu-item index="index" key="index">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item
              index="create"
              key="create"
              :disabled="createBan ? true : false"
            >
              <i class="el-icon-edit-outline"></i>
              <span slot="title">创建Issue</span>
            </el-menu-item>
            <el-menu-item index="query" key="query">
              <i class="el-icon-search"></i>
              <span slot="title">查询Issue</span>
            </el-menu-item>
            <el-menu-item
              index="report"
              key="report"
              :disabled="reportBan ? true : false"
            >
              <i class="el-icon-document"></i>
              <span slot="title">Issue报表</span>
            </el-menu-item>
            <el-menu-item
              index="manage"
              key="manage"
              :disabled="manageBan ? true : false"
            >
              <i class="el-icon-setting"></i>
              <span slot="title">账号管理</span>
            </el-menu-item>
            <el-menu-item
              index="chart"
              key="chart"
              :disabled="reportBan ? true : false"
            >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">信息统计图表</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <!-- 侧边栏收拉切换 -->
          <div
            style="width: 60px; cursor: pointer"
            @click.prevent="toggleSideBar"
          >
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
          <el-menu
            default-active="1"
            class="el-menu-demo tab-page"
            mode="horizontal"
            active-text-color="#409EFF"
          >
            <el-menu-item index="1">{{ $route.name }}</el-menu-item>
          </el-menu>

          <div class="app-header-userinfo">
            <div class="block">
              <el-avatar
                :size="50"
                :src="circleUrl"
                @error="errorHandler"
                @click.native="dialogVisible2 = true"
              ></el-avatar>
            </div>
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">
                  待修改Issue
                  <el-badge
                    class="mark"
                    :value="createNum"
                    :hidden="createNum > 0 ? false : true"
                    :max="10"
                    @click="this.$router.push('/query')"
                  />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  待验证Issue
                  <el-badge
                    class="mark"
                    :value="modifiNum"
                    :hidden="modifiNum > 0 ? false : true"
                    :max="10"
                  />
                </el-dropdown-item>
                <el-dropdown-item @click.native="openDialog">
                  修改个人信息
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view :username="username" />
          </template>
        </el-main>
      </el-container>
    </el-container>

    <!-- 修改个人信息弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="29%"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        class="changeform"
        label-width="78px"
      >
        <h2 class="info-title">修改个人信息</h2>
        <el-form-item prop="userId" class="changeitem" label="登陆ID">
          <el-input
            v-model="ruleForm.userId"
            class="item-input"
            :disabled="true"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="name" class="changeitem" label="姓名">
          <el-input v-model="ruleForm.name" class="item-input"> </el-input>
        </el-form-item>
        <el-form-item prop="email" class="changeitem" label="邮箱">
          <el-input v-model="ruleForm.email" class="item-input"> </el-input>
        </el-form-item>

        <el-form-item prop="password" class="changeitem" label="修改密码">
          <el-input
            type="password"
            v-model="ruleForm.password"
            show-password
            class="item-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPassword" label="确认密码" class="changeitem">
          <el-input
            type="password"
            show-password
            v-model="ruleForm.checkPassword"
            @keyup.enter.native="submitForm('ruleForm')"
            class="item-input"
          ></el-input>
        </el-form-item>

        <el-form-item class="changeitem changebutton">
          <el-button type="info" @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改用户头像的弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      :close-on-click-modal="false"
      width="24%"
      class="wrapper"
    >
      <div class="user-img">
        <el-avatar
          shape="square"
          :size="240"
          fit="cover"
          :src="circleUrl"
        ></el-avatar>
      </div>
      <div class="file">
        更换头像
        <input
          name="file"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          @change="upload"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Container",
  data() {
    // 密码校验规则，8-30位，必须同时包含大小写和特殊字符
    var regex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}");
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regex.test(this.ruleForm.password)) {
        callback(new Error("字符长度在8-30位之间,且必须包含大小写和特殊字符"));
      } else {
        callback();
      }
    };

    // 两次密码一致性的校验规则
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // userid: "",
      circleUrl:
        "https://7975-yuncloud-123-1301997245.tcb.qcloud.la/Icon/user_image.jpg?sign=9f9d56521d6e7ba57afcf1cfcea13a30&t=1588948688",
      username: "",
      permission: "",
      createNum: "",
      modifiNum: "",
      // 用户头像图片路径
      imageUrl:
        "https://7975-yuncloud-123-1301997245.tcb.qcloud.la/Icon/user_image.jpg?sign=9f9d56521d6e7ba57afcf1cfcea13a30&t=1588948688",
      indexBan: false,
      createBan: false,
      reportBan: false,
      manageBan: false,
      isCollapse: false,
      dialogVisible: false,
      dialogVisible2: false,
      // 当前用户的信息
      // currentName: "",
      // currentEmail: "",
      // currentPassword: "",
      ruleForm: {
        userId: "",
        name: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        name: [
          // 非空校验
          {
            required: true,
            message: "请输入您要更改的姓名",
            trigger: "change",
          },
          // 字符长度验证
          {
            max: 30,
            message: "长度必须限制在30字符以内",
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "change",
          },
          // 邮箱长度验证
          {
            max: 30,
            message: "邮箱长度必须限制在30字符以内",
            trigger: "change",
          },
        ],
        password: [
          // 密码非空验证
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
          },
          // 密码长度验证
          {
            max: 30,
            message: "密码长度必须限制在30字符以内",
            trigger: "change",
          },
          // 密码8-30位，且必须包含大小写和特殊字符的验证
          {
            validator: validatePass,
            trigger: "change",
          },
        ],
        checkPassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "change",
          },
          // 两次密码一致性验证
          {
            validator: validatePass2,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //头像加载失败
    errorHandler() {
      return true;
    },

    // 侧边栏的收拉切换事件
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出登录，并把sessionStorage中的信息(用户名、身份信息)清除掉
    logout: function () {
      this.$confirm("确认退出嘛? ⁄(⁄ ⁄ ⁄ω⁄ ⁄ ⁄)⁄", "退出登录", {})
        .then(() => {
          sessionStorage.removeItem("userid");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("permission");
          sessionStorage.removeItem("url");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    //修改个人信息表单提交函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.name);
          this.updateUser();
          // 用户修改个人信息可能会修改到用户名
          // 如果用户修改了用户名，则需要更新sessionStorage中name属性的值
          if (this.username != this.ruleForm.name) {
            sessionStorage.setItem("name", this.ruleForm.name);
            this.username = sessionStorage.getItem("name");
          }
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          this.$alert("请检查您的输入", "输入有误", {
            confirmButtonText: "ok",
            type: "warning",
          });
          return false;
        }
      });
    },
    // 获取当前用户信息的请求
    getUserInfo() {
      axios
        .post("/api/getUserInfo", {
          userid: this.ruleForm.userId,
        })
        .then((res) => {
          console.log(res.data);
          this.ruleForm.userId = res.data.userid;
          this.ruleForm.name = res.data.name;
          this.ruleForm.email = res.data.email;
          this.ruleForm.password = res.data.password;
          this.ruleForm.checkPassword = res.data.password;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改用户信息的请求函数
    updateUser() {
      axios
        .post("/api/updateUser", {
          userid: this.ruleForm.userId,
          name: this.ruleForm.name,
          password: this.ruleForm.password,
          email: this.ruleForm.email,
        })
        .then((res) => {
          if (res.data == 1) {
            // 查询成功提示
            this.$message({
              message: "修改成功~~~",
              type: "success",
            });
          } else if (res.data == 0) {
            // 查询失败提示
            this.$message.error("查询失败~~~");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 请求当前用户待修改issue数、待验证issue数
    getUser() {
      axios
        .post("/api/getUser", {
          userid: this.ruleForm.userId,
        })
        .then((res) => {
          // console.log(res);
          this.createNum = res.data.createNum;
          this.modifiNum = res.data.modifiNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 切换dialog状态
    openDialog() {
      this.getUserInfo();
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    // 用户头像的相关处理函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 文件上传的处理函数
    upload(e) {
      console.log(e);
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("userid", this.ruleForm.userId);
      param.append("file", file); //通过append向form对象添加数据
      console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      console.log(param.get("userid"));
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      }; //添加请求头
      axios.post("api/getUserPic", param, config).then((res) => {
        console.log(res.data);
        this.circleUrl = res.data;
        sessionStorage.setItem("url", res.data);
        this.dialogVisible2 = false;
      });
    },
  },
  mounted: function () {
    // 未登录直接访问系统主页设置警告，并跳转到登录页面
    let userid = sessionStorage.getItem("userid");
    let name = sessionStorage.getItem("name");
    let permission = sessionStorage.getItem("permission");
    let url = sessionStorage.getItem("url");
    console.log(url);
    if (name) {
      this.username = name;
      this.ruleForm.userId = userid;
      this.circleUrl = url;
    } else {
      this.$alert("请先登录 好伐 （￣～￣）", "无效的请求", {
        showClose: false, //不提供关闭按钮
        type: "error",
        confirmButtonText: "ok",
      }).then(() => {
        this.$router.push("/login");
      });
    }
    // 获取当前用户的待修改和待验证issue数
    this.getUser();
    // 按照登陆者的身份信息禁掉相应的功能
    switch (permission) {
      // 1 表示普通用户 2 表示经理 3 超级Admin
      case "1":
        this.reportBan = true;
        this.manageBan = true;
        console.log(this.manageBan);
        console.log(this.reportBan);
        break;
      case "2":
        this.createBan = true;
        this.manageBan = true;
        console.log(this.createBan);
        console.log(this.manageBan);
        break;
      case "3":
        this.createBan = true;
        this.reportBan = true;
        console.log(this.createBan);
        console.log(this.reportBan);
        break;
    }
  },
};
</script>

<style lang="stylus" scoped>
.block
  margin-right 10px
  border-radius 50%
  // box-shadow 0px 0px 4px 0px
.changeform
  position relative
  padding 0 20px
  .info-title
    margin-top -10px
    color #00a8ff
    text-align center
.changebutton
  margin-left 5%
.formtittle
  float left
  margin-left 35%
.changeitem
  margin-top 10px
.avatar-uploader .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
.avatar-uploader .el-upload:hover
  border-color #409EFF
.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center
.avatar
  width 178px
  height 178px
  display block
.wrapper
  .user-img
    margin 0 14%
    img
      width 240px
  .file
    margin 20px 36% 0
    position relative
    display inline-block
    background #D0EEFF
    border 1px solid #99D3F5
    border-radius 4px
    padding 4px 12px
    overflow hidden
    color #1E88C7
    text-decoration none
    text-indent 0
    line-height 20px
.file input
  position absolute
  font-size 100px
  margin-left 100px
  right 0
  top 0
  opacity 0
.file:hover
  background #AADFFD
  border-color #78C3F3
  color #004974
  text-decoration none
</style>
