<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-header>
        <el-row style="background: deepskyblue;width: 100%;height: 60px">
          <el-col :span="4"><img src="../assets/school.png" class="logo" style="max-width: 100%; max-height: 50px;margin-top: 5px"/></el-col>
          <el-col :span="16"><h2 style="margin-top: 10px">后台管理系统</h2></el-col>
          <el-col :span="4">
            <img src="../assets/avatar.png" class="logo" style="max-width: 100%; max-height: 50px;margin-top: 5px"/>
            <span class="quit-login">退出登录</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background: red">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span @click="demo">商品列表</span>
              </template>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view style="height: 100%;width: 100%"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const demo = () => {
  router.push('demo');
}
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  background: white;
}

/* 这里放置组件的样式 */
</style>
