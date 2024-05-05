<template>
  <div id="app">

    <div class="common-layout">
      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="150px">
            <div class="Navigation">
              <router-link to="/">操作页面</router-link>
            </div>
            <div class="Navigation">
              <router-link to="/test">Test</router-link>
            </div>
          </el-aside>
          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>