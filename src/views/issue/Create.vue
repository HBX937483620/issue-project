<template>
  <div class="create">
    <el-form
      :inline="true"
      status-icon
      ref="ruleForm1"
      label-position="left"
      class="demo-ruleForm login-page"
    >
    <div class="title">Issue题目</div>
    <el-form-item prop="title">
      <el-input
        placeholder="请输入Issue题目"
        v-model="input"
        class="title-input"
        clearable>
        </el-input>
    </el-form-item>
    <br>
    <div class="wrapper">
      <el-form-item prop="issueId" label="Issue No" class="item">
        <el-input
          placeholder="系统自动生成"
          v-model="input"
          class="item-input"
          :disabled="true">
        </el-input>
    </el-form-item>
    <el-form-item prop="createDate" label="创建时间" class="item">
      <el-input
        placeholder="系统自动生成"
        v-model="input"
        class="item-input"
        :disabled="true">
      </el-input>
    </el-form-item>
    <el-form-item prop="type" label="Issue类型" class="item">
      <el-input
        placeholder="内容"
        v-model="input"
        class="item-input"
        >
      </el-input>
    </el-form-item>
    <el-form-item prop="level" label="Issue等级" class="item">
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="vision" label="影响版本" class="item">
      <el-input
        placeholder="影响版本"
        v-model="input"
        class="item-input">
      </el-input>
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
      input: '',
      value: '',
      options: [{
          value: '选项1',
          label: '最高'
        }, {
          value: '选项2',
          label: '较高'
        }, {
          value: '选项3',
          label: '一般'
        }, {
          value: '选项4',
          label: '低'
        }]
    };
  },
  methods: {},
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
    min-width: 22%;
    max-width: 22%;
    .item-input
      width 220px
.title
  font-size 30px
  font-weight 550
  color #9900ff
  margin-bottom 10px
</style>