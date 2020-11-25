<template>
  <div class="query">
    <el-form :model="ruleForm" ref="ruleForm" class="form">
      <div class="title">Issue查询</div>
      <br />
      <el-form-item label="Issue No" prop="issueId">
        <el-input
          v-model="ruleForm.issueId"
          @keyup.enter.native="submitForm('ruleForm')"
          class="word-input"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="ruleForm.creator"
          @keyup.enter.native="submitForm('ruleForm')"
          class="word-input"
          maxlength="30"
        ></el-input>
      </el-form-item>

      <el-form-item label="修改人" prop="modifier">
        <el-input
          v-model="ruleForm.modifier"
          @keyup.enter.native="submitForm('ruleForm')"
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
            :picker-options="pickerOptions"
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
        <template slot-scope="scope">
          <el-button
            type="success"
            round
            size="mini"
            class="btn"
            @click.native.prevent="showDetail(scope.$index, tableData)"
            >详情</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            class="btn modify-btn"
            :disabled="showChangeBtn(scope.$index, tableData)"
            @click.native.prevent="showChangeDialog(scope.$index, tableData)"
            >修改</el-button
          >
          <el-button
            size="mini"
            round
            type="info"
            class="btn"
            :disabled="showVerificationBtn(scope.$index, tableData)"
            @click.native.prevent="showVerification(scope.$index, tableData)"
            >验证</el-button
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
    <el-drawer
      :visible.sync="showDetails"
      :show-close="false"
      direction="ltr"
      size="30%"
      class="detailDrawer"
    >
      <el-form class="detail-form">
        <el-form-item label="Issue 题目" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.title"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Issue NO" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.issueid"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Issue 类型" class="drawerItem" label-width="80px">
          <el-input :disabled="true" v-model="detail.type" class="detailsInput">
          </el-input>
        </el-form-item>
        <el-form-item label="Issue 等级" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.level"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Issue 状态" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.state"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="影响版本" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.version"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.createdate"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建人" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.creator"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="修改时间" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.plandate"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="修改人" class="drawerItem" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.modifier"
            class="detailsInput"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="重现步骤" class="area" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.content"
            class="detailsInput"
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item label="解决方案" class="area" label-width="80px">
          <el-input
            :disabled="true"
            v-model="detail.solution"
            class="detailsInput"
            type="textarea"
            autosize
          >
          </el-input>
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
            placeholder="请输入解决方案"
            :autosize="{ minRows: 4, maxRows: 1000 }"
            @keyup.enter.native="submitForm1('changeForm')"
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
        <el-button
          type="success"
          round
          class="verificationDialogButton"
          @click.native.prevent="returnModify"
          >退回修改</el-button
        >
        <el-button
          type="info"
          round
          class="verificationDialogButton"
          @click.native.prevent="closeState"
          >关闭状态</el-button
        >
      </el-form>
    </el-dialog>
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
      userid: "",
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
      // 详情的issue数据
      detail: {
        issueid: "",
        title: "",
        type: "",
        level: "",
        version: "",
        creator: "",
        createdate: "",
        modifier: "",
        state: "",
        plandate: "",
        enddate: "",
        content: "",
        solution: "",
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
      // 设置只能选择今天及之前的日期
      pickerOptions: {
        //控制时间范围
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // 表格的数据
      tableData: [],
      // 修改按钮触发后的获取的modifyIssueid
      modifyIssueid: "",
      // 验证按钮触发后的获取的verificationIssueid
      verificationIssueid: "",
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
    // 时间戳转换日期格式的处理函数
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      return Y + M + D;
    },
    // 是否显示修改按钮
    // 只有当前用户是该条issue修改人和当前issue状态不为“已关闭”的情况下开放
    showChangeBtn(index, rows) {
      if (
        this.userid == rows[index].modifier &&
        rows[index].issuestate.detail != "已关闭"
      ) {
        return false;
      }
      return true;
    },
    // 是否显示验证按钮 只有当前用户是该条issue创建人的情况下开放
    showVerificationBtn(index, rows) {
      if (this.userid == rows[index].creator) {
        return false;
      }
      return true;
    },
    // 查询的表单提交函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
          this.solve();
          this.changeDialog = false;
        } else {
          this.changeDialog = false;
          return false;
        }
      });
    },
    // 重置表单的函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 点击详情按钮的处理函数
    showDetail(index, rows) {
      this.showDetails = true;
      console.log(rows[index].issueid);
      const issueId = rows[index].issueid;
      this.reportDetails(issueId);
    },
    // 显示issue详情的处理函数
    reportDetails(issueId) {
      axios
        .post("/api/reportDetails", {
          issueid: issueId,
        })
        .then((res) => {
          console.log(res);
          console.log(this.timestampToTime(res.data[0].createdate));
          this.detail.issueid = res.data[0].issueid;
          this.detail.title = res.data[0].title;
          this.detail.type = res.data[0].type;
          this.detail.level = res.data[0].level;
          this.detail.version = res.data[0].version;
          this.detail.creator = res.data[0].creator;
          this.detail.createdate = this.timestampToTime(res.data[0].createdate);
          this.detail.modifier = res.data[0].modifier;
          this.detail.state = res.data[0].state;
          this.detail.plandate = this.timestampToTime(res.data[0].plandate);
          this.detail.enddate = this.timestampToTime(res.data[0].enddate);
          this.detail.content = res.data[0].content;
          this.detail.solution = res.data[0].solution;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击修改按钮的处理函数
    showChangeDialog(index, rows) {
      this.changeDialog = true;
      this.modifyIssueid = rows[index].issueid;
    },
    // 提交解决方案的处理函数
    solve() {
      console.log(this.modifyIssueid);
      axios
        .post("/api/solve", {
          issueid: this.modifyIssueid,
          solution: this.changeForm.solution,
        })
        .then((res) => {
          if (res.data == 1) {
            this.$message({
              message: "提交成功~~~",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击验证按钮的处理函数
    showVerification(index, rows) {
      this.verification = true;
      this.verificationIssueid = rows[index].issueid;
    },
    // 验证弹窗中两个按钮的axios请求
    verify(flag) {
      // 利用一个变量来指向this
      const _this = this;
      axios
        .post("/api/verify", {
          issueid: this.verificationIssueid,
          flag: flag,
        })
        .then((res) => {
          console.log(res);
          _this.verification = false;
          this.findReport();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 验证弹窗点击退回修改的处理函数
    returnModify() {
      this.verify(1);
      this.$message({
        message: "退回修改成功~~~",
        type: "success",
      });
    },
    // 验证弹窗点击关闭状态的处理函数
    closeState() {
      this.verify(2);
      this.$message({
        message: "关闭状态成功~~~",
        type: "success",
      });
    },
    // 选择每页显示多少条的处理函数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 选择当前页的处理函数
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 模糊查询 发送post请求，向后台请求report数据
    findReport() {
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
          this.$message({
            message: "查询成功~~~",
            type: "success",
          });
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
    // 页面加载完后，默认将当前登录人的ID显示在修改人的框中
    let userid = sessionStorage.getItem("userid");
    this.userid = userid;
    this.ruleForm.modifier = userid;
    // 创建时请求数据
    this.findReport();
  },
};
</script>
<style lang="stylus" scoped>
// 样式穿透
// 当一个style标签拥有scoped属性时，它的CSS样式就只能作用于当前的组件。
// 也就是说，该样式只能适用于当前组件元素。通过该属性，可以使得组件之间的样式不互相污染。
// 通过 >>> 可以使得在使用scoped属性的情况下，穿透scoped，修改其他组件的值。
>>>.el-drawer.ltr
  overflow scroll
// 隐藏滚动条
>>>.el-drawer__container ::-webkit-scrollbar
  display none
.query
  position relative
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
  // 导出按钮
  .toexcel
    position absolute
    right 70px
    margin 15px 0 30px
    cursor pointer
    cursor hand
    width 100px
    height 34px
  .pagination
    margin-top 10px
  .changFormButton
    margin-left 30%
  .detail-form
    margin-top -30px
    .drawerItem
      padding-left 60px
      padding-right 60px
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
    width 520px
    height 800px
    position absolute
    top 25%
    left 30%
</style>
