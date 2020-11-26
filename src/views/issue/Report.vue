<template>
  <div class="report">
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
        <el-button
          @click="resetForm('ruleForm')"
          icon="el-icon-refresh-right"
          class="reset-btn"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
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
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="用户ID" prop="userid"> </el-table-column>
      <el-table-column label="用户姓名" prop="name"> </el-table-column>
      <el-table-column label="创建Issue数" prop="createNum"> </el-table-column>
      <el-table-column label="收到Issue数" prop="modifiNum"> </el-table-column>
      <el-table-column label="修改Issue数" prop="finishNum"> </el-table-column>
      <el-table-column label="完成率" prop="rateString"> </el-table-column>
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.findIssueReport();
          this.$message({
            message: "查询成功~~~",
            type: "success",
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 模糊查询 发送post请求，向后台请求报表数据
    findIssueReport() {
      axios
        .post("/api/findIssueReport", {
          userid: this.ruleForm.userId,
          name: this.ruleForm.name,
        })
        .then((res) => {
          // console.log(res);
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 修改每页数据数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
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
    this.findIssueReport();
  },
};
</script>

<style lang="stylus" scoped>
.report
  position relative
  .demo-ruleForm
    .word-input
      width 200px
    .reset-btn
      margin-left 20px
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
