<template>
  <div>
  	<el-form :inline="true" :model="form" class="demo-form-inline">
  	  <el-form-item label="会议室" prop="room">
  			<el-select v-model="form.room" placeholder="请选择会议室">
  	      <el-option
  	      	v-for="room in RoomList"
  	      	:key="room.value"
  	      	:label="room.label"
  	      	:value="room.value"
  	      >
  	      </el-option>
  	    </el-select>
  	  </el-form-item>
  	  <el-form-item label="预约日期" required>
  			<el-date-picker
  	      v-model="choosedDay"
  	      type="date"
  	      placeholder="选择日期">
  	    </el-date-picker>
  		</el-form-item>
  	  <el-form-item>
  	    <el-button type="primary" @click="onSearch">查询</el-button>
  	  </el-form-item>
  	</el-form>
    <el-table
      :data="tableData"
    >
      <el-table-column
        label="会议室名称"
        prop="roomName"
      >
      </el-table-column>
      <el-table-column
        label="会议室预约日期"
        prop="appointDate"
      >
      </el-table-column>
      <el-table-column
        label="会议室预约时间"
      >
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.appointTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="会议室预约状态"
      >
        <template scope="scope">
          <el-tag
            :type="scope.row.appointStatus === '0' ? 'primary' : 'success'"
            close-transition>
            {{scope.row.appointStatus === '0' ? '已取消' : '预约中' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="会议室预约人"
        prop="roomUser"
      >
      </el-table-column>
      <el-table-column
        label="操作"
       >
        <template scope="scope">
          <el-button type="text" size="small">通知参会人员</el-button>
          <el-button type="text" size="small" v-if="scope.row.appointStatus === '1'">取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRoomList } from '@/front/api'
import { dateFormat } from '@/front/utils'

// const appointObj = {
//   '0': '已取消',
//   '1': '预约中'
// }

const tableData = [{
  roomName: '会议室A',
  appointDate: '2017-08-27',
  appointTime: '09:00-10:30',
  appointStatus: '1',
  roomUser: 'YJF'
}, {
  roomName: '会议室B',
  appointDate: '2017-08-27',
  appointTime: '10:00-11:30',
  appointStatus: '0',
  roomUser: 'YJF'
}]

export default {
  data () {
    return {
      form: {
        room: ''
      },
      RoomList: [],
      choosedDay: dateFormat(new Date(), 'yyyy-MM-dd'),
      tableData: tableData
    }
  },
  created () {
    this.getRoomListData()
  },
  methods: {
    getRoomListData () {
      getRoomList()
      .then(({ records }) => {
        this.RoomList = records.map(({ roomName }) => ({ label: roomName, value: roomName }))
      })
      .catch(({ code, msg }) => {
        this.$message({
          message: msg,
          type: 'error',
          duration: 2000
        })
      })
    },
    onSearch () {
      console.log('search')
    }
  }
}
</script>