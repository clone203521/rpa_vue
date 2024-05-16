<template>
  <el-table :data="tableData" stripe style="width: 100%" size="large">
    <el-table-column prop="date" label="文件说明" width="180"/>
<!--    <el-table-column prop="name" label="Name" width="180"/>-->
    <el-table-column prop="address" label="文件路径"/>
  </el-table>
</template>
<script setup lang="ts">
const tableData = [
  {
    date: '监控小组及采集小组',
    name: 'Tom',
    address: 'C:/Users/clone/PycharmProjects/flask_test/facebook_group/group_csv/group_info_05-11_filter.csv',
  },
  {
    date: 'Tiktok视频根目录',
    name: 'Tom',
    address: 'C:/Users/clone/PycharmProjects/flask_test/videos',
  },
  {
    date: 'Tiktok用户名',
    name: 'Tom',
    address: 'C:/Users/clone/PycharmProjects/flask_test/split',
  },
  {
    date: '系统日志',
    name: 'Tom',
    address: 'C:/Users/clone/PycharmProjects/flask_test/logs',
  },
]
</script>
<style scoped>
.el-tag {
  margin-right: 5px;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 16px;
}

.el-button {
  margin-right: 10px;
  font-size: 16px;
}

.el-dialog .el-tag {
  margin-right: 5px;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
}


.edit-tags-title {
  display: inline-block;
  margin-right: 5px;
  height: 50px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 16px;
}


.edit-tags-input .el-tag {
  margin-right: 5px;
  height: 100%;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 20px;
}

/* ::v-deep是vue3提供的深度选择器，.el-form-item__label是element-plus官方定义的类 */
.el-form-item__label {
  font-size: 16px; /* 设置字体大小 */
  display: flex;
  align-items: center;
  margin: 0 auto;
}
</style>