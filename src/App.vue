<template>
  <div id="app">
    <el-container>
      <div class="layout_slider">
        <el-aside width="200px">
          <el-scrollbar class="scrollbar">
            <el-menu background-color="#001529" text-color="#fff" style="width: 100%">
              <!-- 根据路由动态生成菜单 -->
              <Menu :menuList='userStore.menuRoutes'></Menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
      </div>
      <el-container>
        <el-header style="background-color: #20c7f1"></el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Menu from './menu/index.vue';
import userUserStore from './store/modules/user/index.ts';

export default defineComponent({
  components: {
    Menu,
  },
  setup() {
    const userStore = userUserStore();
    console.log(userStore)

    return {
      userStore,
    };
  },
});
</script>

<style>
#app {
  height: 600px;
}

.layout_slider {
  width: 200px;
  background-color: #001529;
  height: 100%; /* 设置高度为100% */
}

</style>