<template>
  <div>
    <template v-for="(item) in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="$router.push(item.path)">
          <template #title>
            <!-- 图标 -->
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有子路由，但只有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
            v-if="!item.children[0].meta.hidden"
            :index="item.children[0].path"
        >
          <template #title>
            <!-- 图标 -->
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有子路由，并且大于一个 -->
      <el-sub-menu
          :index="item.path"
          v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <!-- 图标 -->
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 路由递归 : 二级路由还有子路由，子路由又还有子路由-->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>

// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])
console.log(['menuList'])


</script>

<!-- 递归的 -->
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style lang="scss" scoped></style>