<template>
  <div ref="linechart" style="height:400px;width:400px"></div>
        
</template>

<script>
import echarts from "echarts";
 
  export default {
    mounted(){
        let mychart=echarts.init(this.$refs.linechart);
        mychart.setOption({
            xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value' 
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
    }
        )
    },
    data() {
      return {
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
        value: '',
        value1: '',
        
      }
    }
  }
</script>

<style scoped>

</style>