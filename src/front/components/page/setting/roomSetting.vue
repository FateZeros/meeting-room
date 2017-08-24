<template>
	<div>
		<el-form :inline="true" :model="form" class="demo-form-inline">
		  <el-form-item label="会议室名称">
		    <el-input v-model="form.roomName" placeholder="输入会议室名称"></el-input>
		  </el-form-item>
		  <el-form-item>
	    	<el-button type="primary" @click="onSearch">查询</el-button>
	  	</el-form-item>
	  	<el-form-item>
	    	<el-button type="primary" @click="onAddRoom">新增</el-button>
	  	</el-form-item>
		</el-form>
		<el-table
		  :data="RoomList"
		  style="width: 100%"
		>
	    <el-table-column
	      prop="roomName"
	      label="会议室名称"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="creator"
	      label="创建者">
	    </el-table-column>
	    <el-table-column
	      prop="createDate"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      label="操作"
	      width="100"
	     >
	      <template scope="scope">
	        <el-button @click="handleDeleteRoom(scope.$index, RoomList)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	</div>
</template>

<script>
import { getRoomList, addRoom, deleteRoom } from '@/front/api'
import { dateFormat } from '@/front/utils'

export default {
  data () {
    return {
      form: {
        roomName: ''
      },
      RoomList: []
    }
  },
  mounted () {
    this.getRoomListData()
  },
  methods: {
    onSearch () {
      console.log('search')
    },
    onAddRoom () {
      const roomData = { roomName: this.form.roomName }
      addRoom(roomData).then(({ msg }) => {
        this.RoomList = []
        this.$message({
          message: msg,
          type: 'success',
          duration: 1000
        })
      })
      .then(() => {
        this.getRoomListData()
      })
      .catch(({ msg }) => {
        this.$message({
          message: msg,
          type: 'error',
          duration: 2000
        })
      })
    },
    getRoomListData () {
      getRoomList()
      .then(({ records }) => {
        records.forEach(item => {
          item.createDate = dateFormat(new Date(item.createDate.toString()), 'yyyy-MM-dd')
          this.RoomList.push(item)
        })
      })
      .catch(({ code, msg }) => {
        this.$message({
          message: msg,
          type: 'error',
          duration: 2000
        })
      })
    },
    handleDeleteRoom (index, rows) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        const deleteRowName = rows[index].roomName
        deleteRoom(deleteRowName).then(({ msg }) => {
          rows.splice(index, 1)
          this.$message({
            message: msg,
            type: 'success',
            duration: 1000
          })
        }).catch(({ code, msg }) => {
          this.$message({
            message: msg,
            type: 'error',
            duration: 2000
          })
        })
      })
    }
  }
}
</script>

