<template>
  <div class="manage">
    <el-form
      :model="ruleForm"
      :inline="true"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="ruleForm.userId"
          @keyup.enter.native="submitForm('ruleForm')"
          class="word-input"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="name">
        <el-input
          v-model="ruleForm.name"
          @keyup.enter.native="submitForm('ruleForm')"
          class="word-input"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 30px">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="submitForm('ruleForm')"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh-right" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      stripe
      class="content-table"
      style="width: 100%"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="序号" prop="id"> </el-table-column>
      <el-table-column label="用户ID" prop="userid"> </el-table-column>
      <el-table-column label="用户姓名" prop="name"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <el-table-column label="注册时间" :formatter="dateFormat" prop="signup">
      </el-table-column>
      <el-table-column label="用户身份" prop="identity.position">
      </el-table-column>
      <el-table-column label="用户状态" prop="userstate"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :disabled="
              showToManagerBtn(
                scope.$index + (currentPage - 1) * pagesize,
                tableData
              )
            "
            @click.native.prevent="
              toManager(scope.$index + (currentPage - 1) * pagesize, tableData)
            "
            >经理</el-button
          >
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 2px"
            :disabled="
              showLogOffUserBtn(
                scope.$index + (currentPage - 1) * pagesize,
                tableData
              )
            "
            @click.native.prevent="
              LogOffUser(scope.$index + (currentPage - 1) * pagesize, tableData)
            "
            >注销</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 导出按钮 -->
    <div class="toexcel">
      <el-button
        @click="exportExcel"
        type="primary"
        plain
        class="exportBtn"
        style="width: 150px"
        >导出为Excel文件</el-button
      >
    </div>

    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";
// 导出Excel表格的依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      pageTotal: 0,
      currentPage: 1, //默认第一页
      pagesize: 10, //当前显示页数
      // 表格数据
      tableData: [],
      search: "",

      ruleForm: {
        name: "",
        userId: "",
      },
      rules: {
        name: [{ max: 30 }],
        userId: [{ max: 30 }],
      },
    };
  },
  methods: {
    //时间格式化
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD");
    },
    // 是否显示经理按钮按钮
    // 只有当前用户是该条issue的用户身份是“普通用户”的情况下开放
    showToManagerBtn(index, rows) {
      if (
        rows[index].identity.position == "普通用户" &&
        rows[index].userstate != "注销"
      ) {
        return false;
      }
      return true;
    },
    //
    showLogOffUserBtn(index, rows) {
      if (rows[index].userstate != "注销") {
        return false;
      }
      return true;
    },
    // 点击经理按钮的处理函数
    toManager(index, rows) {
      const userId = rows[index].userid;
      this.transToManager(userId);
    },
    // 将普通用户升级为经理的请求函数
    transToManager(userId) {
      axios
        .post("/api/transToManager", {
          userid: userId,
        })
        .then((res) => {
          // console.log(res);
          if (res.data == 1) {
            this.$message({
              message: "升级成功~~~",
              type: "success",
            });
          }
          this.selectLikeByNameOrId(0);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 点击注销按钮的处理函数
    LogOffUser(index, rows) {
      const userId = rows[index].userid;
      this.deleteUser(userId);
    },
    // 将用户状态更改为注销的处理函数
    deleteUser(userId) {
      axios
        .post("/api/deleteUser", {
          userid: userId,
        })
        .then((res) => {
          // console.log(res);
          if (res.data == 1) {
            this.$message({
              message: "注销成功~~~",
              type: "success",
            });
          }
          this.selectLikeByNameOrId(0);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 表单提交的处理函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.selectLikeByNameOrId(1);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 模糊查询 发送post请求，向后台请求表格数据
    selectLikeByNameOrId(flag) {
      axios
        .post("/api/selectLikeByNameOrId", {
          userid: this.ruleForm.userId,
          name: this.ruleForm.name,
        })
        .then((res) => {
          // console.log(res.data);
          if (flag == 1) {
            this.$message({
              message: "查询成功~~~",
              type: "success",
            });
          }
          this.tableData = res.data;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 表单重置函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改当前页的处理函数
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 修改每页显示数据数量的处理函数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 导出表格的处理函数
    exportExcel() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(
        document.querySelector(".content-table")
      );
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      this.$notify({
        title: "成功",
        message: "导出Excel文件成功 ੭ ᐕ)੭*⁾⁾",
        type: "success",
        showClose: false,
      });
      return wbout;
    },
  },
  created() {
    // 创建时请求数据
    this.selectLikeByNameOrId(0);
  },
};
</script>

<style lang="stylus" scoped>
.manage
  position relative
  .demo-ruleForm
    .word-input
      width 200px
  // 导出按钮
  .toexcel
    position absolute
    right 70px
    margin 15px 0 30px
    cursor pointer
    cursor hand
    width 100px
    height 34px
  // 分页
  .pagination
    margin-top 10px
</style>
