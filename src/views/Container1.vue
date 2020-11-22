<template>
  <div class="app">
    <el-container>
      <el-aside
        class="app-side app-side-left"
        :width="isCollapse ? '66px' : '230px'"
      >
        <div class="app-side-logo">
          <img
            src="@/assets/logo.png"
            :width="isCollapse ? '60' : '60'"
            height="60"
          />
        </div>
        <div>
          <el-menu
            :default-active="$route.path"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            :collapse="isCollapse"
          >
            <el-menu-item index="index" key="index">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="create" key="create">
              <i class="el-icon-document"></i>
              <span slot="title">创建Issue</span>
            </el-menu-item>
            <el-menu-item index="report" key="report">
              <i class="el-icon-menu"></i>
              <span slot="title">Issue报表</span>
            </el-menu-item>
            <el-menu-item index="4" :disabled="isCollapse ? false : true">
              <i class="el-icon-document"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
            <el-menu-item index="manage" key="manage">
              <i class="el-icon-setting"></i>
              <span slot="title">账号管理</span>
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
            @select="handleSelect"
            active-text-color="#409EFF"
          >
            <el-menu-item index="1">{{ $route.name }}</el-menu-item>
            <!-- <el-menu-item index="index" key="index">首页</el-menu-item>
            <el-menu-item index="create" key="create">创建Issue</el-menu-item>
            <el-menu-item index="report" key="report">Issue报表</el-menu-item>
            <el-menu-item index="manage" key="manage">账号管理</el-menu-item> -->
          </el-menu>

          <div class="app-header-userinfo">
            <div class="user-img">
              <img
                src="https://7975-yuncloud-123-1301997245.tcb.qcloud.la/Icon/user_image.jpg?sign=9f9d56521d6e7ba57afcf1cfcea13a30&t=1588948688"
                alt="用户头像"
              />
            </div>
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item
                  ><el-button type="text" @click="dialogVisible = true"
                    >修改个人信息</el-button
                  ></el-dropdown-item
                >
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

    <el-dialog
      :visible.sync="dialogVisible"
      background-color="blue"
      width="25%"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        class="changeform"
      >
        <el-form-item
          class="changeitem"
          id="changeFormTittle"
          label="修改个人信息"
          label-width="100px"
        >
        </el-form-item>
        <el-form-item
          prop="userId"
          class="changeitem"
          label="登陆ID"
          label-width="100px"
        >
          <el-input
            placeholder="系统自动生成"
            v-model="ruleForm.userId"
            class="item-input"
            :disabled="true"
            maxlength="30"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="name"
          class="changeitem"
          label="姓名"
          label-width="100px"
        >
          <el-input
            placeholder="输入内容"
            v-model="ruleForm.name"
            class="item-input"
            maxlength="30"
          >
            >
          </el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          class="changeitem"
          label="邮箱"
          label-width="100px"
        >
          <el-input
            placeholder="输入内容"
            v-model="ruleForm.email"
            class="item-input"
            maxlength="30"
          >
            >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          class="changeitem"
          label="修改密码"
          label-width="100px"
        >
          <el-input
            label-width="30px"
            maxlength="30"
            v-model="ruleForm.password"
            placeholder="输入内容"
            class="item-input"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="确认密码"
          class="changeitem"
          label-width="100px"
        >
          <el-input
            maxlength="30"
            v-model="ruleForm.checkPassword"
            placeholder="输入内容"
            class="item-input"
          ></el-input>
        </el-form-item>

        <el-form-item class="changeitem" id="changebutton">
          <el-button type="info" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    // 密码校验规则，8-30位，必须同时包含大小写和特殊字符
    var regex = new RegExp("(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}");
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
      username: "",
      isCollapse: false,
      dialogVisible: false,
      ruleForm: {
        userId: "",
        name: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入修改后的姓名",
            trigger: "blur,change",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "格式不对",
            trigger: "change,blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change,blur",
          },
          // 密码8-30位，且必须包含大小写和特殊字符的验证
          {
            validator: validatePass,
            trigger: "change,blur",
          },
        ],
        checkPassword: [
          {
            required: true,
            message: "不能为空",
            trigger: "change,blur",
          },
          // 两次密码一致性验证
          {
            validator: validatePass2,
            trigger: "change,blur",
          },
        ],
      },
    };
  },
  methods: {
    // 侧边栏的收拉切换事件
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    logout: function () {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("name");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //修改个人信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },

  mounted: function () {
    // 未登录直接访问系统主页设置警告，并跳转到登录页面
    let name = sessionStorage.getItem("name");
    if (name) {
      this.username = name;
    } else {
      this.$alert("请先登录", "无效的请求", {
        confirmButtonText: "ok",
        // showClose: false,
      }).then(() => {
        this.$router.push("/login");
      });
    }
  },
};
</script>

<style>
.user-img {
  margin-right: 10px;
}
.user-img > img {
  width: 55px;
  height: 55px;
}
.changeform {
  position: relative;
}
#ButtonItem {
  background-color: aquamarine;
  position: relative;
}
#changebutton > * {
  margin-left: 100px;
}

.formtittle {
  float: left;
  margin-left: 35%;
}
.changeitem {
  margin-top: 10px;
}
#changeFormTittle {
  font-size: 50px;
}
</style>
