<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px" :rules="rules">
			<el-row>
				<el-col :span="10">
					<el-form-item label="用户名称" prop="userName">
				    <el-input v-model="form.userName"></el-input>
				  </el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
				<el-col :span="10">
					<el-form-item label="部门">
				    <el-cascader
					    :options="orgOptions"
					    v-model="selectedOptions"
					    @change="handleChange"
					    style="width: 100%;">
					  </el-cascader>
				  </el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
				<el-col :span="10">
					<el-form-item label="用户邮箱" prop="userEmail">
				    <el-input v-model="form.userEmail" placeholder="请输入用户邮箱"></el-input>
				  </el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
				<el-col :span="10">
					<el-form-item label="用户权限" prop="userRight">
				     <el-select v-model="form.userRight" placeholder="请选择用户权限" style="width: 100%;">
				     		<el-option label="超级管理员" value="super"></el-option>
      					<el-option label="部门主管" value="master"></el-option>
      					<el-option label="普通用户" value="general"></el-option>
				     </el-select>
				  </el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">保存</el-button>
			    <el-button @click="onCancel">取消</el-button>
			  </el-form-item>
		  </el-row>
		</el-form>
	</div>
</template>

<script>
const options = [{
  value: 'zhinan',
  label: '指南',
  children: [{
    value: 'shejiyuanze',
    label: '设计原则'
  }]
}]

export default {
  data () {
    return {
      form: {
        userName: '',
        userEmail: '',
        userRight: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名' }
        ],
        userEmail: [
          { required: true, message: '请输入用户邮箱' },
          { type: 'email', message: '请输入正确的邮箱地址' }
        ],
        userRight: [
          { required: true, message: '请选择用户权限' }
        ]
      },
      orgOptions: options,
      selectedOptions: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    onCancel () {
      this.$router.go(-1)
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('submit')
        } else {
          return false
        }
      })
    }
  }
}
</script>