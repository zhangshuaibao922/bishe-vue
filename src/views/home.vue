<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-openeds="opends"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="overflow-y: auto;max-height: 100%;border-right-style: solid;border-width: 1px;border-color: #d9d9d9;"
        >
          <div style="height: 60px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;display: flex">
            <img src="../assets/school.png" style="height: 50px;width: 70px;margin-top: 5px">
            <div style="font-size:large;margin-left: 10px;margin-top: 13px;font-weight: bold;color: black">在线批阅系统</div>
          </div>
          <el-sub-menu style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="1">
            <template #title>
              <el-icon size="30px"><Notification /></el-icon>
              <span style="font-size: 18px;margin-left: 10px">信息管理</span>
            </template>
            <el-menu-item index="1-1" @click="toSchool">学院管理</el-menu-item>
            <el-menu-item index="1-2" @click="toClass">学生管理</el-menu-item>
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
          <el-menu-item style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="3" @click="toAnswer">
            <el-icon size="30px"><icon-menu /></el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px" >答题卡录入</span></template>
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
          <el-menu-item style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" index="7" @click="toUser">
            <el-icon size="30px"><User /></el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px">用户信息</span></template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="align-items:center;position:relative;display: flex;font-size: 12px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;">
        <h1 style="margin-left: 10px;font-size: 20px;font-weight: bold;color: black">{{mark}}</h1>
        <div style="position:absolute;height:100%;width: 130px;right: 20px;display: flex;align-items: center">
          <img src="../assets/avatar.png" style="height: 50px;width: 50px;margin-top: 5px">
          <h1 style="margin-left: 5px;font-size: 18px;font-weight: bold;color: black">{{username}}</h1>
        </div>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
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
const mark =ref("欢迎使用");
const opends=['1','2','3','4','5','6','7'];
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const router = useRouter();

const toAnswer=()=>{
  mark.value="答题卡录入";
  router.push('answer');
}
const toSchool=()=>{
  mark.value="学院管理";
  router.push('school');
}
const toClass=()=>{
  mark.value="学生管理";
  router.push('class');
}
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: white;
}
.layout-container-demo .el-aside {
  color: white;
  background: white;
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
</style>
