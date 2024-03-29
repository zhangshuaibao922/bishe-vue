<template>
  <el-container class="layout-container-demo" style="height: 100%">

    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        style="border-right-style: solid;border-width: 1px;border-color: #d9d9d9;"
    >
      <div style="height: 60px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;display: flex">
        <img src="../assets/school.png" style="height: 50px;width: 60px;margin-top: 5px">
        <div v-if="!isCollapse" style="font-size:x-large;margin-left: 15px;margin-top: 10px">在线批阅系统</div>
      </div>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4" @click="demo">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header style="align-items:center;position:relative;display: flex;font-size: 12px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;">
        <div style="height: 30px;width: 30px;" @click="changeIsCollapse">
            <svg v-if="!isCollapse"   style="height: 30px;width: 30px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-4f7f2e72=""><path fill="currentColor" d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"></path></svg>
            <svg v-else style="height: 30px;width: 30px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-4f7f2e72=""><path fill="currentColor" d="M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352 192 160-192 128V352z"></path></svg>
       </div>
        <h1 style="margin-left: 10px;font-size: 20px;font-weight: bold">首页</h1>
        <div style="position:absolute;height:100%;width: 130px;right: 20px;display: flex;align-items: center">
          <img src="../assets/avatar.png" style="height: 50px;width: 50px;margin-top: 5px">
          <h1 style="margin-left: 5px;font-size: 18px;font-weight: bold;">{{username}}</h1>
        </div>
      </el-header>
      <router-view/>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
const username=ref(localStorage.getItem("name"));
const isCollapse = ref(false)
const changeIsCollapse=()=>{
  isCollapse.value = !isCollapse.value;
  console.log(isCollapse.value)
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const router = useRouter();
const demo = () => {
  router.push('welcome');
}
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
}
</style>
