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
   
    <el-button @click="draw()">画图</el-button>
    
  </el-form-item>
  
    <div id="confirmedchart" style="height:400px;width:400px"></div>
    <div id="deathchart" style="height:400px;width:400px"></div>
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
        lineOption : {
                title: {
                    text: '确诊病例'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['真实确诊病例', '预测确诊病例']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        dataZoom: {
                    yAxisIndex: 'none'
                },
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ["04-22","04-23","04-24","04-25","04-26","04-27","04-28","04-29"]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '真实确诊病例',
                        type: 'line',
                        
                        data: [120, 132, 142, 154, 170, 200, 240,290]
                    },
                    {
                        name: '预测确诊病例',
                        type: 'line',
            
                        data: [121, 134, 149, 160, 178, 210, 240,300]
                    },
                  
                ]
},

  lineOption2 : {
    title: {
        text: '死亡病例'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['真实死亡病例', '预测死亡病例']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {},
            dataZoom: {
                    yAxisIndex: 'none'
                },
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["04-22","04-23","04-24","04-25","04-26","04-27","04-28","04-29"]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '真实死亡病例',
            type: 'line',
            
            data: [20, 32, 41, 56, 70, 90, 100,103]
        },
        {
            name: '预测死亡病例',
            type: 'line',
            
            data: [20, 28, 42, 54, 68, 86, 100,115]
        },
       
    ]
}
        ,
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
      
      
     
      draw(){
        const _this=this;
        console.log(this.ruleForm)
         
        //  axios.post("",this.ruleForm).then(function(resp){
        //     if (resp.mes=="success"){
        //        _this.lineOption.series.data=resp.data.currentComfirmedCount;
        //      _this.lineOption.xAxis.data=resp.data.date;
        //     }
        // })
        let mychart=echarts.init(document.getElementById("confirmedchart"));
        mychart.setOption(_this.lineOption)

        let deathChart=echarts.init(document.getElementById("deathchart"));
        deathChart.setOption(_this.lineOption2)
      },
     
    },
    
  }
</script>

<style  scoped>



.el-form{
   
  width: 100%;
  height: 100%;
}
#confirmedchart {
  float: left;
}
#deathchart {
  
  float: right;
}
</style>