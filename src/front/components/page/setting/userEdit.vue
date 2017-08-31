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
					<el-form-item label="用户邮箱" prop="userEmail">
				    <el-input v-model="form.userEmail" placeholder="请输入用户邮箱"></el-input>
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
					<el-form-item label="用户权限" prop="userRight">
				     <el-select v-model="form.userRight" placeholder="请选择用户权限" style="width: 100%;">
				     		<el-option label="超级管理员" value="role_1"></el-option>
      					<el-option label="管理员" value="role_2"></el-option>
      					<el-option label="普通用户" value="role_3"></el-option>
				     </el-select>
				  </el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">保存</el-button>
			    <el-button @click="onBack">返回</el-button>
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

import { addUser, getUser, editUser } from '@/front/api'

export default {
  created () {
    const { email } = this.$router.history.current.query
    if (email) {
      this.action = 'EDIT'
      this.getUserDetail(email)
    }
  },
  data () {
    return {
      action: 'ADD',
      editUserId: '',
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
    onBack () {
      this.$router.back()
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = {
            userName: this.form.userName,
            userEmail: this.form.userEmail,
            userRight: this.form.userRight
          }
          if (this.action === 'ADD') {
            this.addUserData(formData)
          } else if (this.action === 'EDIT') {
            formData.editUserId = this.editUserId
            this.editUserData(formData)
          }
        } else {
          return false
        }
      })
    },
    addUserData (formData) {
      addUser(formData)
      .then(({ msg }) => {
        this.$message({
          message: msg,
          type: 'success',
          duration: 2000
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
    editUserData (formData) {
      editUser(formData)
      .then(({ msg }) => {
        this.$message({
          message: msg,
          type: 'success',
          duration: 2000
        })
      })
    },
    getUserDetail (email) {
      getUser(email)
      .then(res => {
        const { username, roleId, email, _id } = res.records
        this.form.userName = username
        this.form.userEmail = email
        this.form.userRight = roleId
        this.editUserId = _id
      })
    }
  }
}
</script>