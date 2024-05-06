<template>
      <el-card style="display: flex; align-items: center;margin-top: 50px;margin-right: 400px;margin-left: 100px">
        <span style="font-size: 48px;color: #4A90E2;" >欢迎登录在线批阅系统</span>
        <el-row style="width: 1000px;height: 500px">
          <el-col :span="18">
            <img  src="../../assets/avatar.png" style="margin: 50px;height: 400px; width: 400px;">
          </el-col>
          <el-col :span="6">
            <el-form label-position="left" label-width="100px" :model="form" style="margin-top: 200px">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input v-model="form.description"></el-input>
              </el-form-item>
              <el-form-item label="账号">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="旧密码">
                <el-input v-model="form.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="更新密码">
                <el-input v-model="form.newPassword" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: center;">
              <el-button @click="update" type="primary" size="large">
                更新信息
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
</template>


<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {ElMessage} from "element-plus";
import {useStudentStore} from "@/stores/counter";
import {updatePassword} from "@/request/login/login";
const studentStore = useStudentStore();
interface User{
  name:string,
  username:string,
  oldPassword:string,
  newPassword:string,
  description:string,
  authorityRole:string,
  identity:string,
}
const form=ref<User>({
  name:'',
  username:'',
  oldPassword:'',
  newPassword:'',
  description:'',
  authorityRole:'',
  identity:'',
});

const update=async ()=>{
  console.log(form.value)
  const res=await updatePassword(form.value);
  if(res.data){
    form.value.oldPassword='';
    form.value.newPassword='';
    ElMessage.success("修改成功")
  }else {
    ElMessage.success("修改失败")
  }
  console.log(res.data)
}

onMounted(async () => {
  form.value=studentStore.userInfo;
  form.value.oldPassword='';
});
</script>

<style scoped>

</style>
