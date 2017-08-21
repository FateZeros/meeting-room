<template>
	<div>
		<el-form :inline="true" :model="form" :rules="rules" ref="appointForm" class="demo-form-inline">
			<el-form-item label="会议室" prop="room">
				<el-select v-model="form.room" placeholder="请选择会议室">
		      <el-option label="爱琴岛" value="room-1"></el-option>
		      <el-option label="马尔代夫" value="room-2"></el-option>
		    </el-select>
			</el-form-item>
			<el-form-item label="预约时间" required>
				<el-col :span="11">
					<el-form-item prop="startTime">
						<el-time-select
					    placeholder="起始时间"
					    v-model="form.startTime"
					    :picker-options="{
					      start: '09:00',
					      step: '00:30',
					      end: '18:00'
					    }">
				  	</el-time-select>
			  	</el-form-item>
			  </el-col>
			  <el-col class="line" :span="2">-</el-col>
			  <el-col :span="11">
			  	<el-form-item prop="endTime">
				  	<el-time-select
					    placeholder="结束时间"
					    v-model="form.endTime"
					    :picker-options="{
					      start: '09:00',
					      step: '00:30',
					      end: '18:00',
					      minTime: form.startTime
					    }">
				  	</el-time-select>
			  	</el-form-item>
		  	</el-col>
			</el-form-item>
			<el-form-item>
		    <el-button type="primary" @click="onSubmit('appointForm')">预约会议室</el-button>
		  </el-form-item>
		</el-form>
		<div class="room-use">
			<div class="room-title">会议室使用情况</div>
			<room-using></room-using>
			<el-row>
				<span>预约日期</span>
				<el-date-picker
		      v-model="choosedDay"
		      type="date"
		      placeholder="选择日期"
		      @change="onChoosedDayChange"
		      :picker-options="pickerOptions">
		    </el-date-picker>
			</el-row>
		</div>
	</div>
</template>

<script>
import RoomUsing from '../chart/roomUsing.vue'

export default {
  data () {
    return {
      form: {
        room: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        room: [
          { required: true, message: '请选择会议室' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      choosedDay: ''
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('submit', this.form.room, this.form.startTime)
        } else {
          return false
        }
      })
    },
    onChoosedDayChange (choosedDay) {
      if (choosedDay) {
        console.log(choosedDay)
      }
    }
  },
  components: {
    RoomUsing
  }
}
</script>

<style>
.room-use {
	height: 100%;
	font-size: 14px;
}

.room-title {
	text-align: center;
}
</style>