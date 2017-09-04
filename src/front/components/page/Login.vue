<template>
	<div class="login">
		<el-form class="demo-ruleForm login-form" :model="loginForm" :rules="loginRule" ref="loginForm">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model.tirm="loginForm.userName">
				</el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model.trim="loginForm.password">
				</el-input>
			</el-form-item>
			<p class="input-tip">
				{{inputErr}}
			</p>
			<el-form-item>
		    <el-button type="primary" @click="doLogin('loginForm')">登录</el-button>
		    <el-button @click="doRegister()">注册</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
import { Login } from '@/front/api'

export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRule: {
        userName: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      },
      inputErr: ''
    }
  },
  methods: {
    doLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit', this.loginForm.userName, this.loginForm.password)
          const LoginData = { username: this.loginForm.userName, password: this.loginForm.password }
          Login(LoginData).then(({ records: { username, userImg, userRole, token } }) => {
            // 登录成功 用户信息
            const loginUser = {
              username,
              userImg: 'http://192.168.1.54:6633' + userImg,
              userRole,
              token
            }
            localStorage.setItem('MEETING_INFO', JSON.stringify(loginUser))
            this.$router.push({ path: '/home' })
          }).catch(({ code, msg }) => {
            if (code === -1) {
              this.$message({
                message: msg,
                type: 'error',
                duration: 2000
              })
            } else {
              this.inputErr = msg
            }
          })
        } else {
          return false
        }
      })
    },
    doRegister () {
      this.$router.push({ path: '/register' })
    },
    clearTip () {
      this.inputErr = ''
    }
  },
  watch: {
    loginForm: {
      handler: 'clearTip',
      deep: true
    }
  }
}
</script>

<style>
.login {
	width: 100%;
	height: 100%;
	background: url('/static/imgs/login-bg.jpg') no-repeat center;
	background-size: cover;
	position: absolute;
	left: 0;
	bottom: 0;
}

.login-form {
	width: 300px;
	height: 300px;
	background: #fff;
	border-radius: 10px;
	margin: 240px auto;
	padding: 16px;
}

.input-tip {
	text-align: center;
	color: rgb(255, 0, 0);
	font-size: 12px;
}
</style>