<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const demo=()=>{
  router.push('/demo');
}
// const list = router.getRoutes().filter(value => value.meta.isShow);
// console.log(list);
</script>

<style scoped>
.common-layout{
  width: 100%;
  height: 100%;
  background: red;
}
/* 这里放置组件的样式 */
</style>
