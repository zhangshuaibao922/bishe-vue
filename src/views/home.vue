<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-openeds="opends"
            class="el-menu-vertical-demo"
            default-active="2"
            style="overflow-y: auto;max-height: 100%;border-right-style: solid;border-width: 1px;border-color: #d9d9d9;"
            @close="handleClose"
            @open="handleOpen"
        >
          <div
              style="height: 60px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;display: flex">
            <img src="../assets/school.png" style="height: 50px;width: 70px;margin-top: 5px">
            <div style="font-size:large;margin-left: 10px;margin-top: 13px;font-weight: bold;color: black">
              在线批阅系统
            </div>
          </div>
          <el-sub-menu v-if="role==='ROOT'" index="1"
                       style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;">
            <template #title>
              <el-icon size="30px">
                <Notification/>
              </el-icon>
              <span style="font-size: 18px;margin-left: 10px">信息管理</span>
            </template>
            <el-menu-item index="1-1" @click="toSchool">学院管理</el-menu-item>
            <el-menu-item index="1-2" @click="toTeacher">教师管理</el-menu-item>
            <el-menu-item index="1-3" @click="toStudentInfo">学生管理</el-menu-item>
            <el-menu-item index="1-4" @click="toClass">课程管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item v-if="role!=='ROOT'&&role!=='STUDENT'"
                        index="2" style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;"
                        @click="toMyClass">
            <el-icon size="30px">
              <icon-menu/>
            </el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px">我的课程</span></template>
          </el-menu-item>
          <el-sub-menu v-if="role!=='ROOT'&&role!=='STUDENT'"
                       index="3" style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;">
            <template #title>
              <el-icon size="30px">
                <Crop/>
              </el-icon>
              <span style="font-size: 18px;margin-left: 10px">考试设置</span>
            </template>
            <el-menu-item index="3-1" @click="toTest">测试</el-menu-item>
            <el-menu-item index="3-2" @click="toExam">考试</el-menu-item>
          </el-sub-menu>
          <el-menu-item v-if="role!=='ROOT'&&role!=='STUDENT'"
                        index="4" style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;"
                        @click="toScore">
            <el-icon size="30px">
              <EditPen/>
            </el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px">在线批阅</span></template>
          </el-menu-item>
          <el-menu-item v-if="role!=='ROOT'" index="5"
                        style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;" @click="toSeeScore">
            <el-icon size="30px">
              <document/>
            </el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px">成绩统计</span></template>
          </el-menu-item>
          <el-menu-item v-if="role==='ROOT'"
                        index="6" style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;"
                        @click="toAuthority">
            <el-icon size="30px">
              <setting/>
            </el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px">权限分配</span></template>
          </el-menu-item>
          <el-menu-item index="7" style="border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;"
                        @click="toWelcome">
            <el-icon size="30px">
              <User/>
            </el-icon>
            <template #title><span style="font-size: 18px;margin-left: 10px">用户信息</span></template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header
          style="align-items:center;position:relative;display: flex;font-size: 12px;background: white;border-bottom-style: solid;border-width: 1px;border-color: #d9d9d9;">
        <h1 style="margin-left: 10px;font-size: 20px;font-weight: bold;color: black">{{ mark }}</h1>
        <div style="position:absolute;height:100%;width: 130px;right: 20px;display: flex;align-items: center">
          <img src="../assets/avatar.png" style="height: 50px;width: 50px;margin-top: 5px">
          <el-dropdown>
            <span style="margin-left: 5px;font-size: 18px;font-weight: bold;color: black">
            {{ username }}
          </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {
  Document,
  Menu as IconMenu,
  Setting, Notification, User, EditPen, Crop,ArrowDown
} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus';
const username = ref(localStorage.getItem("name"));
const mark = ref("欢迎使用");
const opends = ['1', '2', '3', '4', '5', '6', '7'];
const role = ref('');

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const router = useRouter();
const logout=()=>{
  localStorage.clear();
  ElMessage.success("退出登录")
  router.push("/");
}
const toSchool = () => {
  mark.value = "学院管理";
  router.push('school');
}
const toClass = () => {
  mark.value = "课程管理";
  router.push('class');
  localStorage.setItem('class', 'class');
}
const toMyClass = () => {
  mark.value = "我的课程";
  router.push('myclass');
  localStorage.setItem('class', 'myclass');
}
const toTest = () => {
  mark.value = "测试安排"
  router.push('test');
}
const toExam = () => {
  mark.value = "考试安排"
  router.push('exam');
}
const toScore = () => {
  mark.value = "在线批阅"
  router.push('score');
}
const toSeeScore = () => {
  mark.value = "成绩统计"
  router.push('seeScore');
}
const toWelcome = () => {
  mark.value = "用户信息"
  router.push('welcome');
}
const toTeacher = () => {
  mark.value = "教师管理"
  router.push('teacher');
}
const toAuthority = () => {
  mark.value = "权限管理"
  router.push('authority');
}
const toStudentInfo = () => {
  mark.value = "学生管理"
  router.push('studentInfo');
}
onMounted(async () => {
  role.value = localStorage.getItem('authorityRole')
});
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
