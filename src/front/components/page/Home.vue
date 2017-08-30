<template>
  <div>
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <keep-alive>
          <router-view>
          </router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import vHeader from '../common/Header.vue'
import vSidebar from '../common/Sidebar.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    vHeader,
    vSidebar
  }
}
</script>

<style scoped>
  .content {
    margin-left: 250px;
    padding: 20px;
  }
</style>
