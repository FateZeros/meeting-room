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
        prop="roleName"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200px"
       >
        <template scope="scope">
          <el-button type="text" size="small" @click="onEditUser">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
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

const userTable = [{
  username: 'user1',
  department: '部门A',
  email: '49029032@qq.com',
  roleName: '普通用户'
}]

export default {
  data () {
    return {
      userForm: {
        userName: ''
      },
      orgOptions: options,
      selectedOptions: [],
      userTable: userTable
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    onEditUser () {
      this.$router.push({ path: '/set-user/edit' })
    }
  }
}
</script>