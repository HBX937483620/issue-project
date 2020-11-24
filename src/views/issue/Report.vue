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

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      stripe
      style="width: 100%"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="序号" sortable prop="id"></el-table-column>
      <el-table-column label="用户ID" sortable prop="userid"> </el-table-column>
      <el-table-column label="用户姓名" prop="name"> </el-table-column>
      <el-table-column label="创建Issue数" prop="createNum"> </el-table-column>
      <el-table-column label="收到Issue数" prop="modifiNum"> </el-table-column>
      <el-table-column label="修改Issue数" prop="finishNum"> </el-table-column>
      <el-table-column label="完成率" sortable prop="rateString">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";

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
  },
  created() {
    // 创建时请求数据
    this.findIssueReport();
  },
};
</script>

<style lang="stylus" scoped>
.demo-ruleForm
  .word-input
    width 200px
  .reset-btn
    margin-left 20px
</style>
