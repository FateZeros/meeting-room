<template>
	<div id="roomUsing-chart"></div>
</template>

<script>
import G2 from 'g2'

const data = [
 { room: '爱情岛', usingTime: ['09:00', '10:30'] },
 { room: '爱情岛', usingTime: ['11:00', '12:30'] },
 { room: '拉斯维加斯', usingTime: ['09:00', '10:30'] }
]

export default {
  mounted () {
    // const Util = G2.Util
    const Frame = G2.Frame
    let frame = new Frame(data)
    // 1.创建Chart对象
    const chart = new G2.Chart({
      id: 'roomUsing-chart',
      forceFit: true,
      width: 800,
      height: 300
    })
    // 2.载入数据源
    chart.source(frame, {
      room: {
        alias: '会议室',
        values: ['爱情岛', '拉斯维加斯']
      },
      usingTime: {
        alias: '使用时间'
      }
    })
    // 3.创建图形语法，绘制住状图
    chart.interval().position('room * usingTime').size(30)
    // 4.渲染图表
    chart.render()
  }
}
</script>

<style>
#roomUsing-chart {
  margin-bottom: 20px;
}
</style>