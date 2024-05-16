<template>
  <div class="not-found">
    <h1>404</h1>
    <p>哎呀!找不到您要查找的页面</p>
    <p>Oops! The page you're looking for cannot be found.</p>
    <el-button type="primary" @click="goBack" size="large">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      history.back()
    }
  }
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 72px;
  color: #444;
}

p {
  font-size: 24px;
  color: #888;
}
</style>