<template>
  <div id="QueryBody">
    issue查询
    <hr />
    <el-form :model="ruleForm" ref="ruleForm" class="Form">
      <el-form-item label="issueId" prop="issueId">
        <el-input
          v-model="ruleForm.issueId"
          style="width: 200px"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="ruleForm.creator"
          style="width: 200px"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="修改人" prop="modifier">
        <el-input
          v-model="ruleForm.modifier"
          style="width: 200px"
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
        <template>
          <el-button type="success" size="mini" @click="details = true"
            >详情</el-button
          >
          <el-button size="mini" type="danger" @click="changeDialog = true"
            >修改</el-button
          >
          <el-button type="success" size="mini" @click="verification = true"
            >验证</el-button
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
    <!-- 修改的弹窗 -->
    <el-dialog
      title="解决方案"
      :visible.sync="changeDialog"
      id="solutionDialog"
    >
      <el-form :model="changeForm" ref="changeForm" :rules="changFormRule">
        <el-form-item id="solutionAera" prop="solution">
          <el-input
            v-model="changeForm.solution"
            type="textarea"
            placeholder="请输入内容"
            :autosize="{ minRows: 4, maxRows: 1000 }"
          >
          </el-input>
        </el-form-item>
        <el-form-item id="changFormButton">
          <el-button type="primary" @click="submitForm('changeForm')"
            >确认</el-button
          >
          <el-button type="info" @click="changeDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 详情的弹窗 -->
    <el-drawer :visible.sync="details" direction="ltr" size="30%">
      <el-form>
        <el-form-item label="Issue 题目" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="Issue NO" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="Issue 类型" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="Issue 等级" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="Issue 状态" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="影响版本" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="创建人" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="修改时间" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="修改人" class="drawerItem" label-width="80px">
          <el-input :disabled="true" class="detailsInput"> </el-input>
        </el-form-item>
        <el-form-item label="重现步骤" id="aera" label-width="80px">
          <el-input
            :disabled="true"
            class="detailsInput"
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item id="DrawerClose">
          <el-button type="primary" @click="details = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 验证的弹窗 -->
    <el-dialog :visible.sync="verification" id="verificationDialog">
      <el-form id="verificationForm">
        <el-button type="success" round class="verificationDialogButton"
          >退回修改</el-button
        >
        <el-button type="info" round class="verificationDialogButton"
          >关闭状态</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //弹窗
      changeDialog: false,
      details: false,
      verification: false,
      //分页联动
      pageTotal: 0,
      currentPage: 1, //默认第一页
      pagesize: 10, //当前显示页数
      changeForm: {
        solution: "",
      },
      ruleForm: {
        issueId: "",
        creator: "",
        modifier: "系统默认当前登录ID",
        createDate: "",
        endDate: "",
        value: "",
      },
      state: "",
      changFormRule: {
        solution: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
      },
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
}
#changFormButton {
  margin-left: 30%;
}
.drawerItem {
  padding-left: 60px;
  padding-right: 60px;
}
.el-drawer.ltr {
  overflow: scroll;
}
#DrawerClose {
  margin-left: 47%;
}
#aera {
  padding-left: 60px;
  padding-right: 60px;
}

#solutionDialog {
  /* background-color: antiquewhite; */
  width: 800px;
  height: 800px;
  position: absolute;
  top: 10%;
  left: 25%;
}
#verificationDialog {
  width: 34%;
  height: 800px;
  position: absolute;
  top: 25%;
  left: 34%;
}
</style>
