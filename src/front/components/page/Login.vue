<template>
	<div class="login">
		<el-form class="demo-ruleForm login-form" label-width="60px">
			<el-form-item label="用户名">
				<el-input>
				</el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

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
	width: 400px;
	height: 300px;
	background: #fff;
	border-radius: 10px;
	margin: 240px auto;
	padding: 80px 16px 16px;
}
</style>