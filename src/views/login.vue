<template>
  <div class="login-box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <h2>在线批阅系统</h2>
      <el-form-item label="身份：" prop="identity">
        <el-select v-model="ruleForm.identity" placeholder="选择身份" style="width: 200px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm(ruleFormRef)"
        >登录
        </el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import type {FormInstance, FormRules} from 'element-plus';
import {login} from "@/request/login/login";
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus';

interface loginData {
  identity: string,
  username: string,
  password: string
}
interface User {
  name: string,
  username: string,
  oldPassword: string,
  newPassword: string,
  description: string,
  authorityRole: string,
  identity: string,
}

const options = [
  {
    value: 'teacher',
    label: '教师',
  },
  {
    value: 'student',
    label: '学生',
  },
]
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const ruleForm: loginData = reactive({
  identity: "",
  username: "",
  password: ""
});

const rules = {
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 3, max: 10, message: '账号的长度在3-10之间', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 10, message: '密码的长度在3-10之间', trigger: 'blur'},
  ],
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    // 处理登录成功的情况
    if (valid) {
      login(ruleForm).then((res) => {
        const user:User=res.data.data;
        console.log(user);
        if(Object.keys(user).length==0){
          ElMessage.error("登陆失败，请检查账号密码")
        }else {
          ElMessage.success("登录成功")
          localStorage.setItem('name',user.name)
          console.log(localStorage.getItem('name'))
          localStorage.setItem('authorityRole',user.authorityRole)
          router.push('/welcome');
        }
      }).catch((error: any) => {
        console.error("登录失败：", error);
      });
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("src/assets/login-bg.jpg");
  text-align: center;
  padding: 1px;

  .demo-ruleForm {
    width: 400px;
    margin: 200px auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 5px;
  }

  .login-btn {
    margin-left: 40px;
    width: 48%;
  }

  h2 {
    margin-bottom: 20px;
  }
}
</style>
