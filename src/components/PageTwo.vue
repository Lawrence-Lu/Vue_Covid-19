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
    <el-button @click="receive()">Receive</el-button>
    <el-button @click="draw()">画图</el-button>
    <el-button @click="clean()">清图</el-button>
  </el-form-item>
  
    <div ref="linechart" style="height:400px;width:400px"></div>
  </el-form>
 
 
</template>

<script>
import axios from "axios";
import echarts from "echarts";
 
  export default {
  //  mounted(){
  //    const _this=this;
  //       let mychart=echarts.init(this.$refs.linechart);
  //       mychart.setOption(_this.lineOption)
  //   },

    data() {
      return {
        ruleForm: {
          region: '',
          date1: '',
        },
        rules: {
         
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          // date1: [
          //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          // ],
        
        },
        lineOption: {
          tooltip:{},
          xAxis: {
        type: 'category',
        data: ''
    },
    yAxis: {
        type: 'value' 
    },
    series: {
        data: '',
        type: 'line'
    }

        },
        options: [{
          value: 'China_Hubei',
          label: '中国湖北'
        }, {
          value: 'America_Califonia',
          label: '美国加州'
        }, {
          value: 'Italy',
          label: '意大利'
        }, {
          value: 'France',
          label: '法国'
        }, {
          value: 'Spain',
          label: '西班牙'
        }],
      };
    },
     created(){
         axios.get("../../static/case.json").then(function (resp){
             console.log(resp)
         })
     },
    methods: {
      submitForm(formName) {
        const _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
              console.log(_this.ruleForm);
            
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      receive(){
        const _this=this;
        axios.get("../../static/case.json").then(function (resp){
             _this.lineOption.series.data=resp.data.case;
             _this.lineOption.xAxis.data=resp.data.date;
         })
      },
      draw(){
        const _this=this;
        
        let mychart=echarts.init(this.$refs.linechart);
        mychart.setOption(_this.lineOption)
      },
      clean(){
        const _this=this;
        _this.lineOption.series.data='';
        _this.lineOption.xAxis.data='';
      }
    },
    
  }
</script>