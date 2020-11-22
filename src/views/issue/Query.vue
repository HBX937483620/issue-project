<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" class="form">
      <div class="title">Issue查询</div>
      <br />
      <el-form-item label="Issue No" prop="issueId">
        <el-input
          v-model="ruleForm.issueId"
          class="word-input"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="ruleForm.creator"
          class="word-input"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="修改人" prop="modifier">
        <el-input
          v-model="ruleForm.modifier"
          class="word-input"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="Issue 状态" prop="state">
        <el-select v-model="ruleForm.state" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间" prop="createDate">
        <div>
          <el-date-picker
            v-model="ruleForm.createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="修改时间" prop="endDate">
        <div>
          <el-date-picker
            v-model="ruleForm.endDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <div class="button">
        <el-form-item class="button">
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
      </div>
    </el-form>

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      stripe
      class="content-table"
    >
      <el-table-column header-align="center" type="selection">
      </el-table-column>
      <el-table-column header-align="center" label="ID" sortable prop="id">
      </el-table-column>
      <el-table-column
        header-align="center"
        label="Issue ID"
        sortable
        prop="issueid"
        width="100px"
      >
      </el-table-column>
      <el-table-column header-align="center" label="Issue标题" prop="title">
      </el-table-column>
      <el-table-column header-align="center" label="创建人" prop="creator">
      </el-table-column>
      <el-table-column
        header-align="center"
        label="创建时间"
        sortable
        prop="createdate"
        :formatter="dateFormat"
        width="125px"
      >
      </el-table-column>
      <el-table-column header-align="center" label="修改人" prop="modifier">
      </el-table-column>
      <el-table-column
        header-align="center"
        label="Issue状态"
        prop="issuestate.detail"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        label="计划完成时间"
        sortable
        prop="plandate"
        :formatter="dateFormat"
        width="140px"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        label="实际完成时间"
        sortable
        prop="enddate"
        :formatter="dateFormat"
        width="140px"
      >
      </el-table-column>
      <el-table-column header-align="center" label="操作" width="192px">
        <template>
          <el-button
            type="success"
            round
            size="mini"
            class="btn"
            @click="showDetails = true"
            >详情</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            class="btn modify-btn"
            @click="changeDialog = true"
            >修改</el-button
          >
          <el-button
            size="mini"
            round
            type="info"
            class="btn"
            @click="verification = true"
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
      :page-sizes="[5, 10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      class="pagination"
    >
    </el-pagination>

    <!-- 详情的弹窗 -->
    <el-drawer :visible.sync="showDetails" direction="ltr" size="30%">
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
        <el-form-item label="重现步骤" class="area" label-width="80px">
          <el-input
            :disabled="true"
            class="detailsInput"
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item class="DrawerClose">
          <el-button type="primary" @click="details = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 修改的弹窗 -->
    <el-dialog
      title="解决方案"
      :visible.sync="changeDialog"
      :close-on-click-modal="false"
      class="solutionDialog"
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
        <el-form-item class="changFormButton">
          <el-button type="primary" @click="submitForm1('changeForm')"
            >确认</el-button
          >
          <el-button type="info" @click="changeDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 验证的弹窗 -->
    <el-dialog
      :visible.sync="verification"
      :close-on-click-modal="false"
      class="verificationDialog"
    >
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
import axios from "axios";

export default {
  data() {
    return {
      //详情、修改、验证三个按钮对应的弹窗数据
      showDetails: false,
      changeDialog: false,
      verification: false,
      changeForm: {
        solution: "",
      },
      changFormRule: {
        solution: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
      },
      // 分页联动数据
      pageTotal: 0,
      currentPage: 1, //默认第一页
      pagesize: 10, //当前显示页数
      toggle: false,
      ruleForm: {
        issueId: "",
        creator: "",
        modifier: "",
        state: "",
        createDate: "",
        endDate: "",
        value: "",
      },
      options: [
        {
          value: "1",
          label: "待修改",
        },
        {
          value: "2",
          label: "待验证",
        },
        {
          value: "3",
          label: "已关闭",
        },
      ],
      // 表格的数据
      tableData: [],
    };
  },
  // 一值得记录的bug！！！
  // 监听ruleForm中rule.createDate和rule.endDate的变化，
  // 监听其在其在清空时将值置为null的变化，然后将其置为初始默认的数据""
  watch: {
    //解决清空日期后rule.createDate变成null的问题
    "ruleForm.createDate": {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal);
        if (newVal == null) {
          // console.log("createDate changed");
          this.ruleForm.createDate = "";
        }
      },
      immediate: true,
      // deep: true,
    },
    "ruleForm.endDate": {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal);
        if (newVal == null) {
          // console.log("createDate changed");
          this.ruleForm.endDate = "";
        }
      },
      immediate: true,
      // deep: true,
    },
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
    // 查询的表单提交函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "查询成功~~~",
            type: "success",
          });
          this.findReport();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改的表单的提交函数
    submitForm1(formName1) {
      this.$refs[formName1].validate((valid) => {
        if (valid) {
          this.$message({
            message: "查询成功~~~",
            type: "success",
          });
          this.changeDialog = false;
        } else {
          // console.log("error submit!!");
          this.changeDialog = false;
          return false;
        }
      });
    },
    // 重置表单的函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 选择每页显示多少条的处理函数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    // 选择当前页的处理函数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 发送post请求，向后台请求report数据
    findReport() {
      // console.log(this.ruleForm.createDate);
      axios
        .post("/api/findReport", {
          issueid: this.ruleForm.issueId,
          state: this.ruleForm.state,
          creator: this.ruleForm.creator,
          modifier: this.ruleForm.modifier,
          createStartDate: this.ruleForm.createDate[0],
          createEndDate: this.ruleForm.createDate[1],
          endStartDate: this.ruleForm.endDate[0],
          endEndDate: this.ruleForm.endDate[1],
        })
        .then((res) => {
          console.log(res.data);
          // console.log(res.data[5].createDate);
          this.tableData = res.data;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
  created() {
    // 页面加载完后，默认将当前登录人的ID显示在修改人的框中
    let userid = sessionStorage.getItem("userid");
    this.ruleForm.modifier = userid;
    // 请求数据
    this.findReport();
  },
};
</script>
<style lang="stylus" scoped>
.form > *
  float left
  margin-left 5%
  .word-input
    width 200px
.title
  float none
  font-size 30px
  font-weight 550
  color #00a8ff
  margin-bottom -14px
  margin-left 10px
  padding-left 10px
  border-left 10px solid #8c7ae6
.button
  margin-top 17px
.content-table
  width 100%
  .btn
    margin-left 0
  .modify-btn
    margin 0 1px
.pagination
  margin-top 10px
.changFormButton
  margin-left 30%
.drawerItem
  padding-left 60px
  padding-right 60px
.el-drawer.ltr
  overflow scroll
.DrawerClose
  margin-left 47%
.area
  padding-left 60px
  padding-right 60px
.solutionDialog
  width 800px
  height 800px
  position absolute
  top 10%
  left 25%
.verificationDialog
  width 34%
  height 800px
  position absolute
  top 25%
  left 34%
</style>
