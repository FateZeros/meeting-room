<template>
  <div class="header">
	 <div class="logo">会议室预约系统</div>
   <div class="user-info">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img class="user-logo" :src="userImg"/>
          {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    const userInfo = {
      username: 'YJF',
      userImg: 'http://localhost:6633/static/imgs/users/defaultUser.jpeg'
    }
    localStorage.setItem('MEETING_INFO', JSON.stringify(userInfo))
  },
  data () {
    const { username, userImg } = JSON.parse(localStorage.getItem('MEETING_INFO'))
    return {
      username,
      userImg
    }
  }
}
</script>

<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  background: #324157;
}

.logo {
  float: left;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link{
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo{
  position: absolute;
  left:0;
  top:15px;
  width:40px;
  height:40px;
  border-radius: 50%;
}

.el-dropdown-menu__item{
  text-align: center;
}
</style>