<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [{
          icon: 'el-icon-setting',
          index: '/home',
          title: '预约'
        }, {
          icon: 'el-icon-document',
          index: 'mine',
          title: '我的',
          subs: [{
            index: '/my-appoint',
            title: '预约记录'
          }]
        }]
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .sidebar{
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }

  .sidebar > ul {
    height:100%;
  }
</style>
