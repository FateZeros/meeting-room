<template>
	<div id="roomUsing-chart"></div>
</template>

<script>
import G2 from 'g2'
import appointTime from '@/front/utils/appointTime.js'
import { getRoomUsing } from '@/front/api'
import { dateFormat } from '@/front/utils'
// const data = [
//  { room: '爱情岛', usingTime: [0, 1], roomUser: 'aaa' },
//  { room: '爱情岛', usingTime: [4, 5], roomUser: 'bbb' },
//  { room: '拉斯维加斯', usingTime: [6, 9], roomUser: 'ccc' },
//  { room: '拉斯维加斯', usingTime: [1, 3], roomUser: 'aaa' },
//  { room: '巴厘岛', usingTime: [9, 13], roomUser: 'ddd' },
//  { room: '雪山之巅', usingTime: [0, 18], roomUser: 'eee' }
// ]

export default {
  data () {
    return {
      roomUsingData: [],
      chartObj: ''
    }
  },
  mounted () {
    this.initChart()
    const day = dateFormat(new Date(), 'yyyy-MM-dd')
    this.getRoomsData(day)
  },
  methods: {
    initChart () {
      // 创建Chart对象
      const chart = new G2.Chart({
        id: 'roomUsing-chart',
        width: 1000,
        height: 400
      })
      this.chartObj = chart
      // const Frame = G2.Frame
      // 将JSON对象转换成G2内置的Frame对象
      // const frame = new Frame(this.roomUsingData)
      chart.axis('usingTime', {
        title: null,
        formatter: function (usingTime) {
          return appointTime[usingTime]
        }
      })
      // 载入数据源
      chart.source(this.roomUsingData, {
        room: {
          alias: '会议室'
        },
        usingTime: {
          title: null
        }
      })
      // 图例切换显示有问题，暂时不显示
      chart.legend(false)
      // 直角坐标系，x轴与y轴互换
      chart.coord('rect').transpose()
      // 创建图形语法，绘制住状图
      chart.interval().position('room*usingTime').color('room').size(24)
      // 渲染图表
      chart.render()
      // tooltip配置
      chart.on('tooltipchange', function (ev) {
        const items = ev.items
        const origin = items[0]
        const roomUser = `${origin.point._origin.roomUser}预约`
        // console.log(origin)
        items.splice(0)
        items.push({
          name: '开始时间',
          title: roomUser,
          marker: true,
          value: appointTime[origin.value.split('-')[0]]
        })
        items.push({
          name: '结束时间',
          title: roomUser,
          marker: true,
          value: appointTime[origin.value.split('-')[1]]
        })
      })
    },
    getRoomsData (day) {
      getRoomUsing(day).then(({ records }) => {
        // 强行使用此行清楚canvas缓存 不然会有x轴显示对应不上
        this.chartObj.changeData([])
        let chartData = []
        if (records.length > 0) {
          chartData = this.dataToChartData(records)
        }
        this.chartObj.changeData(chartData)
      })
    },
    dataToChartData (resData) {
      const chartData = []
      resData.forEach(roomItem => {
        roomItem.roomUse.forEach(item => {
          const chartItem = {}
          chartItem.room = roomItem.room
          chartItem.usingTime = item.usingTime
          chartItem.roomUser = item.user
          chartData.push(chartItem)
        })
      })
      return chartData
    }
  }
}
</script>

<style>
#roomUsing-chart {
  margin-bottom: 16px;
  width: 1000px;
}
</style>