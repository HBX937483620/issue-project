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
            <el-menu-item index="4" :disabled="isCollapse ? false : true">
              <i class="el-icon-document"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
            <el-menu-item
              index="manage"
              key="manage"
              :disabled="manageBan ? true : false"
            >
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
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {
      username: "",
      permission: "",
      indexBan: false,
      createBan: false,
      reportBan: false,
      manageBan: false,
      isCollapse: false,
    };
  },
  methods: {
    // 侧边栏的收拉切换事件
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出登录，并把sessionStorage中的信息(用户名、身份信息)清除掉
    logout: function () {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("userid");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("permission");
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
  },
  mounted: function () {
    // 未登录直接访问系统主页设置警告，并跳转到登录页面
    let name = sessionStorage.getItem("name");
    let permission = sessionStorage.getItem("permission");
    console.log(permission);
    if (name) {
      this.username = name;
    } else {
      this.$alert("请先登录", "无效的请求", {
        confirmButtonText: "ok",
      }).then(() => {
        this.$router.push("/login");
      });
    }
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
.user-img
  margin-right 10px
  img
    width 55px
    height 55px
</style>
