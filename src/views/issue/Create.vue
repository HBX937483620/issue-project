<template>
  <div class="create">
    <el-form
      :model="ruleForm"
      :rules="rules3"
      :inline="true"
      status-icon
      ref="ruleForm"
      label-position="left"
      class="demo-ruleForm login-page"
    >
      <div class="title">Issue题目</div>
      <el-form-item prop="title">
        <el-input
          placeholder="请输入Issue题目"
          v-model="ruleForm.title"
          maxlength="30"
          class="title-input"
          clearable
        >
        </el-input>
      </el-form-item>
      <br />
      <div class="wrapper">
        <el-form-item prop="issueId" label="Issue No" class="item">
          <el-input
            placeholder="系统自动生成"
            v-model="ruleForm.issueId"
            class="item-input"
            :disabled="true"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="createDate" label="创建时间" class="item">
          <el-input
            placeholder="系统自动生成"
            v-model="ruleForm.createDate"
            class="item-input"
            :disabled="true"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="type" label="Issue类型" class="item">
          <el-input
            placeholder="内容"
            maxlength="30"
            v-model="ruleForm.type"
            class="item-input"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="level" label="Issue等级" class="item">
          <el-select v-model="ruleForm.level" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="vision" label="影响版本" class="item">
          <el-input
            placeholder="影响版本"
            v-model="ruleForm.vision"
            maxlength="30"
            class="item-input"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="planDate" label="计划修改时间" class="item">
          <el-date-picker
            v-model="ruleForm.planDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate" label="实际完成时间" class="item">
          <el-input
            placeholder="系统自动生成"
            v-model="ruleForm.endDate"
            class="item-input"
            :disabled="true"
          >
          </el-input>
        </el-form-item>
        <!-- 占位item -->
        <el-form-item class="item none"> </el-form-item>
      </div>
      <!-- 重现步骤 -->
      <div class="content">
        <el-form-item prop="content">
          <div class="font-bold">重现步骤</div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            maxlength="2000"
            show-word-limit
            class="content-input"
            v-model="ruleForm.content"
          >
          </el-input>
        </el-form-item>
      </div>
      <!-- 指派修改人 -->
      <div>
        <el-form-item prop="modifier">
          <div class="font-bold">指派修改人</div>
          <el-input placeholder="内容" v-model="ruleForm.modifier"> </el-input>
        </el-form-item>
      </div>
      <div class="btn">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Create",
  data() {
    return {
      ruleForm: {
        title: "",
        issueId: "",
        createDate: "",
        type: "",
        level: "",
        vision: "",
        planDate: "",
        endDate: "",
        content: "",
        modifier: "",
      },
      options: [
        {
          value: "选项1",
          label: "最高",
        },
        {
          value: "选项2",
          label: "较高",
        },
        {
          value: "选项3",
          label: "一般",
        },
        {
          value: "选项4",
          label: "低",
        },
      ],
      rules3: {
        title: [
          // 不为空验证
          {
            required: true,
            message: "请输入Issue题目",
            trigger: "change",
          },
        ],
      },
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
  },
};
</script>
<style lang="stylus" scoped>
.title-input
  width 600px
.wrapper
  display flex
  flex-wrap wrap
  .item
    flex 1
    min-width 20%
    max-width 20%
    .item-input
      width 250px
  .none
    visibility hidden
.font-bold
  font-weight 600
.content
  .content-input
    width 1000px
.title
  font-size 30px
  font-weight 550
  color #9900ff
  margin-bottom 10px
.btn
  margin 0 auto
</style>