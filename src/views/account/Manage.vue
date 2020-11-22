<template>
  <div>
    <el-form
      :model="ruleForm"
      :inline="true"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="ruleForm.name" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="ruleForm.userId" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: 100px">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >查询</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column label="用户ID" sortable prop="date"> </el-table-column>
      <el-table-column label="用户姓名" prop="name"> </el-table-column>
      <el-table-column label="邮箱" prop="date"> </el-table-column>
      <el-table-column label="注册时间" prop="date"> </el-table-column>
      <el-table-column label="用户身份" prop="date"> </el-table-column>
      <el-table-column label="用户状态" prop="date"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-left: 0"
            @click="handleEdit(scope.$index, scope.row)"
            >经理</el-button
          >
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 0"
            @click="handleDelete(scope.$index, scope.row)"
            >注销</el-button
          >
        </template>
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
export default {
  data() {
    return {
      pageTotal: 0,
      currentPage: 1, //默认第一页
      pagesize: 10, //当前显示页数
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-05",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
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
    index() {
      this.tableData.forEach((item) => {
        item.index = (currentPage - 1) * pageSize + index + 1;
      });
    },
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
  },
};
</script>

<style></style>
