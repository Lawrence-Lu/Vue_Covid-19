<template>
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  
  
  <el-form-item label="国家/地区" prop="region">  <!--prop:对应哪条校验规则-->
    <el-select v-model="ruleForm.region" placeholder="请选择一个国家或地区">
       <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="查询时间段" required>
    <el-col :span="6">
      <el-form-item prop="date1">
        <el-date-picker 
        type="daterange" 
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-model="ruleForm.date1" 
        value-format="yyyy-MM-dd"
        style="width: 100%;">
        </el-date-picker>
      </el-form-item>
    </el-col>
   
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>  
    <el-button @click="test('ruleForm')">Test</el-button>
  </el-form-item>
     </el-form>
</template>