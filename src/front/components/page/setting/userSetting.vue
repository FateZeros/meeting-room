<template>
	<div>
		<el-form label-width="80px">
			<el-row>
				<el-col :span="6">
					<el-form-item label="部门">
						<el-cascader
					    :options="orgOptions"
					    v-model="selectedOptions"
					    @change="handleChange">
					  </el-cascader>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="6">
		  		<el-form-item label="姓名">
		  			<el-input placeholder="请输入姓名"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="6">
		  		<el-button type="primary" style="margin-left: 16px;">查询</el-button>
		  		<el-button type="primary" @click="handleAddUser">新增用户</el-button>
		  	</el-col>
		 	</el-row>
		</el-form>
		<el-table
			:data="userTable"
		>
			<el-table-column
        label="用户名"
        prop="username"
      >
      </el-table-column>
      <el-table-column
        label="所属部门"
        prop="department"
      >
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email"
      >
      </el-table-column>
      <el-table-column
        label="用户角色"
        prop="userRight"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200px"
       >
        <template scope="scope">
          <el-button type="text" size="small" @click="onEditUser(scope.row.email)">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteUser(scope.row.email)">删除</el-button>
          <el-button type="text" size="small" @click="onResetPasswd(scope.row.email)">重置密码</el-button>
        </template>
      </el-table-column>
		</el-table>
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

import { getUserList, deleteUser, resetPasswd } from '@/front/api'

export default {
  created () {
    this.getUserData()
  },
  data () {
    return {
      userForm: {
        userName: ''
      },
      orgOptions: options,
      selectedOptions: [],
      userTable: []
    }
  },
  methods: {
    getUserData () {
      getUserList().then(({ records }) => {
        this.userTable = records
      })
    },
    handleChange (value) {
      console.log(value)
    },
    handleAddUser () {
      this.$router.push({ name: 'userEdit' })
    },
    onEditUser (email) {
      this.$router.push({ name: 'userEdit', query: { email } })
    },
    onDeleteUser (email) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteUser(email)
        .then(() => {
          this.userTable = this.userTable.filter(user => user.email !== email)
        })
        .catch(({ msg }) => {
          this.$message({
            message: msg,
            type: 'error',
            duration: 2000
          })
        })
      })
    },
    onResetPasswd (email) {
      this.$confirm('确定要重置密码吗？', '提示', {
        type: 'warning'
      }).then(() => {
        resetPasswd(email)
        .then(({ msg }) => {
          this.$message({
            message: msg,
            type: 'success',
            duration: 2000
          })
        })
      })
    }
  },
  watch: {
    '$route': 'getUserData'
  }
}
</script>