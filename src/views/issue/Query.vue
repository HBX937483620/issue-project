<template>
  <div>
    issue查询
    <hr />
    <el-form :model="ruleForm" ref="ruleForm" class="Form">
      <el-form-item label="issueId" prop="issueId">
        <el-input
          v-model="ruleForm.issueId"
          style="width: 200px;"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="ruleForm.creator"
          style="width: 200px;"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="修改人" prop="modifier">
        <el-input
          v-model="ruleForm.modifier"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item prop="state" label="Issue状态">
        <el-select v-model="ruleForm.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <div>
          <el-date-picker
            v-model="ruleForm.createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="修改时间">
        <div>
          <el-date-picker
            v-model="ruleForm.endDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <div class="button">
        <el-form-item class="button">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      style="width: 100%"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column label="Issue ID" sortable prop="date"> </el-table-column>
      <el-table-column label="Issue标题" prop="name"> </el-table-column>
      <el-table-column label="创建人" prop="date"> </el-table-column>
      <el-table-column label="创建时间" prop="date"> </el-table-column>
      <el-table-column label="修改人" prop="date"> </el-table-column>
      <el-table-column label="Issue状态" prop="date"> </el-table-column>
      <el-table-column label="计划完成时间" prop="date"> </el-table-column>
      <el-table-column label="实际完成时间" prop="date"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            style="margin-left: 0"
            @click="handleEdit(scope.$index, scope.row)"
            >详情</el-button
          >
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 0"
            @click="handleDelete(scope.$index, scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10]"
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
      ruleForm: {
        issueId: "",
        creator: "",
        modifier: "系统默认当前登录ID",
        createDate: "",
        endDate: "",
        value: "",
      },
      state: "",

      options: [
        {
          value: "选项1",
          label: "待修改",
        },
        {
          value: "选项2",
          label: "待验证",
        },
        {
          value: "选项3",
          label: "已关闭",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-05",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
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
      ],
    };
  },

  methods: {
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
};
</script>
<style>
.Form > * {
  float: left;
  margin-left: 5%;
}
.button {
  margin-top: 17px;
  /* height: 50px;
  width: 100%;
  margin-left: 15%; */
}
</style>
