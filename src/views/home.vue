<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        style="overflow-y: auto;max-height: 100%;border-right-style: solid;border-width: 1px;border-color: #d9d9d9;"
    >
      <div style="height: 60px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;display: flex">
        <img src="../assets/school.png" style="height: 50px;width: 70px;margin-top: 5px">
        <div v-if="!isCollapse" style="font-size:x-large;margin-left: 15px;margin-top: 10px;font-weight: bold">在线批阅系统</div>
      </div>
      <el-sub-menu style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="1">
        <template #title>
          <el-icon size="30px"><Notification /></el-icon>
          <span style="font-size: 18px;margin-left: 10px">信息管理</span>
        </template>
        <el-menu-item index="1-1">学院管理</el-menu-item>
        <el-menu-item index="1-2">班级管理</el-menu-item>
        <el-menu-item index="1-3">教师管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="2">
        <template #title>
          <el-icon size="30px"><Notification /></el-icon>
          <span style="font-size: 18px;margin-left: 10px">考试安排</span>
        </template>
        <el-menu-item index="2-1">测试</el-menu-item>
        <el-menu-item index="2-2">考试</el-menu-item>
      </el-sub-menu>
      <el-menu-item style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="3">
        <el-icon size="30px"><icon-menu /></el-icon>
        <template #title><span style="font-size: 18px;margin-left: 10px">答题卡录入</span></template>
      </el-menu-item>
      <el-sub-menu style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="4">
        <template #title>
          <el-icon size="30px"><Notification /></el-icon>
          <span style="font-size: 18px;margin-left: 10px">批阅</span>
        </template>
        <el-menu-item index="4-1">正常批阅</el-menu-item>
        <el-menu-item index="4-2">异常重阅</el-menu-item>
      </el-sub-menu>
      <el-menu-item style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="5">
        <el-icon size="30px"><document /></el-icon>
        <template #title><span style="font-size: 18px;margin-left: 10px">成绩统计</span></template>
      </el-menu-item>
      <el-menu-item style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="6">
        <el-icon  size="30px"><setting /></el-icon>
        <template #title><span style="font-size: 18px;margin-left: 10px">权限分配</span></template>
      </el-menu-item>
      <el-menu-item style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="7" @click="demo">
        <el-icon size="30px"><User /></el-icon>
        <template #title><span style="font-size: 18px;margin-left: 10px">用户信息</span></template>
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
  Setting, Notification, User,
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
