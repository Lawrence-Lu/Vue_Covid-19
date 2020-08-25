<template>
  <div>
    <Form :model="FormItem" :label-width="100" style="width: 480px; margin: 20px auto" show-message>
      <FormItem label="国家/地区" required>
        <label>
          <Select v-model="areaCountry" style="width:300px">
            <OptionGroup label="China">
              <Option v-for="item in China" :value="'China_' + item" :key="item">{{ item }}</Option>
            </OptionGroup>
            <OptionGroup label="US">
              <Option v-for="item in US" :value="item" :key="'US_'+item">{{ item }}</Option>
            </OptionGroup>
            <OptionGroup label="France">
              <Option v-for="item in France" :value="item" :key="'France_'+item" >{{ item }}</Option>
            </OptionGroup>
          </Select>
        </label>
      </FormItem>

      <FormItem label="预测模型" required>
        <label>
          <Select v-model="model" style="width:300px">
            <Option v-for="item in models" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </label>
      </FormItem>

      <FormItem label="查询时间段" required>
        <!--start-date要往前一点-->
        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 300px"
                    @on-change="selectDate"
                    :start-date="new Date(2020, 3, 1)"
        ></DatePicker>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="predict">Predict</Button>
      </FormItem>
    </Form>

    <div style="width: 1300px; margin: auto; display: flex">
      <line-chart ref="confirmed" style="width: 600px;height: 400px"></line-chart>

      <line-chart ref="fatal" style="width: 600px;margin-left: 98px;height: 400px"></line-chart>
    </div>
  </div>
</template>

<script>
  import LineChart from "../components/common/lineChart/LineChart1"

  export default {
    name: "Predict1",
    components: {
      LineChart
    },
    data() {
      return {
        model: '',
        area: '',
        country: '',
        areaCountry: '',
        datestart: '',
        dateend: '',
        models: [
          {
            value: '多项式',
            label: '多项式'
          },
          {
            value: '随机森林',
            label: '随机森林'
          },
          {
            value: '深度学习',
            label: '深度学习'
          },
          {
            value: 'lightgbm',
            label: 'lightgbm'
          },
          {
            value: 'XGBoost',
            label: 'XGBoost'
          },
        ],
        China: [
          'Shanghai',
          'Hubei',
          'Anhui',
          'Beijing',
          'Shangdong',
        ],
        US: [
          'Guam',
          'Hawaii',
          'New Jersey', 'New York', 'Washington', 'West Virginia'
        ],
        France: [
          'French Guiana',
          'French Polynesia'
        ]
      }
    },
    methods: {
      predict() {
        this.area = this.areaCountry.split('_')[1]
        this.country = this.areaCountry.split('_')[0]
        console.log(this.area)
        this.$http.post('/query/', this.qs.stringify({
          // model: this.model,
          // area: this.area,
          // country: this.country,
          // datestart: this.datestart,
          // dateend: this.dateend
        })).then(res => {
          let data = res.data.retlist
          let dates = []
          let confirmedCases = []
          let fatalities = []
          let predConfirmedCases = []
          let predFatalities = []
          for (let item of data) {
            dates.push(item.date)
            confirmedCases.push(item.confirmedCases)
            fatalities.push(item.fatalities)
            predConfirmedCases.push(item.predConfirmedCases)
            predFatalities.push(item.predFatalities)
          }

          this.$refs.confirmed.option.xAxis.data = dates
          this.$refs.confirmed.option.series[0].data = confirmedCases
          this.$refs.confirmed.option.series[0].name = '真实确认病例'
          this.$refs.confirmed.option.series[1].data = predConfirmedCases
          this.$refs.confirmed.option.series[1].name = '预测确认病例'

          this.$refs.fatal.option.xAxis.data = dates
          this.$refs.fatal.option.series[0].data = fatalities
          this.$refs.fatal.option.series[0].name = '真实死亡病例'
          this.$refs.fatal.option.series[1].data = predFatalities
          this.$refs.fatal.option.series[1].name = '预测死亡病例'

          this.$refs.confirmed.lineChart.setOption(this.$refs.confirmed.option)
          this.$refs.fatal.lineChart.setOption(this.$refs.fatal.option)
        }).catch(err => {
          this.$Message.error(err.toString())
        })
      },
      selectDate(start) {
        this.datestart = start[0]
        this.dateend = start[1]
      }
    }
  }
</script>

<style scoped>

</style>
