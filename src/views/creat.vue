<template>
  <div class="login-box">
    <el-select v-model="identity" placeholder="选择身份" style="width: 200px">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
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
        <el-button type="primary" class="login-btn" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {FormInstance, FormRules} from 'element-plus';
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus';

interface Teacher {
  id: number
  collegeId: string
  teacherId: string
  teacherName: string
  teacherPassword: string
  idCardNo: string
  mobilePhone: string
  authorityId: string
  status: string
  description: string
}
interface Student {
  id: string
  classId: string
  studentId: string
  studentPassword: string
  studentName: string
  idCardNo: string
  mobilePhone: string
  gender: string
  status: string
  authorityId: string
  description: string
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
const studentInfo=ref<Student>()
const teacherInfo=ref<Teacher>()
const identity=ref('')

const rules = {
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 3, max: 20, message: '账号的长度在3-10之间', trigger: 'blur'},
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
  background: url("@/assets/login-bg.jpg");
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
