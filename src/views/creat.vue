<template>
  <div class="login-box">
    <div class="demo-ruleForm">
      <h2>账号注册</h2>
      <el-select v-model="identity" placeholder="选择身份" style="margin-left:90px;margin-bottom: 20px;width: 230px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-form
          v-if="identity==='student'"
          ref="ruleFormRef"
          :model="studentInfo"
          status-icon
          :rules="rules"
          label-width="90px"
      >
        <el-form-item label="学号：" prop="studentId">
          <el-input v-model="studentInfo.studentId" autocomplete="off" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="姓名：" prop="studentName">
          <el-input
              v-model="studentInfo.studentName"

              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="所属学院：" prop="idCardNo">
          <el-select v-model="studentInfo.collegeId" placeholder="选择学院" style="width: 300px">
            <el-option v-for="item in optionsCollege" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                  {{ item.value }}
                </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码：" prop="studentPassword">
          <el-input
              v-model="studentInfo.studentPassword"
              type="password"
              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="重复密码：" prop="password">
          <el-input
              v-model="password"
              type="password"
              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCardNo">
          <el-input
              v-model="studentInfo.idCardNo"

              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>

        <el-form-item label="邮箱：" prop="studentEmail">
          <el-input
              v-model="studentInfo.studentEmail"

              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="验证码：" prop="verificationCode">
          <el-input placeholder="请输入验证码"
                    v-model="studentInfo.code"

                    autocomplete="off"
                    style="width: 300px">
            <template #append>
              <el-button type="primary" @click="sendVerificationCode" >发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            注册
          </el-button>
          <el-button type="primary" style="margin-left: 70px" @click="toLogin()">
            去登录
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
          v-if="identity==='teacher'"
          ref="ruleFormRef"
          :model="teacherInfo"
          status-icon
          :rules="rules"
          label-width="90px"
      >
        <el-form-item label="教师ID：" prop="teacherId">
          <el-input v-model="teacherInfo.teacherId" autocomplete="off" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="姓名：" prop="teacherName">
          <el-input
              v-model="teacherInfo.teacherName"

              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="所属学院：" prop="idCardNo">
          <el-select v-model="teacherInfo.collegeId" placeholder="选择学院" style="width: 300px">
            <el-option v-for="item in optionsCollege" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                  {{ item.value }}
                </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码：" prop="teacherPassword">
          <el-input
              v-model="teacherInfo.teacherPassword"
              type="password"
              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="重复密码：" prop="password">
          <el-input
              v-model="password"
              type="password"
              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCardNo">
          <el-input
              v-model="teacherInfo.idCardNo"

              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="邮箱：" prop="teacherEmail">
          <el-input
              v-model="teacherInfo.teacherEmail"
              autocomplete="off"
              style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="验证码：" prop="verificationCode">
          <el-input placeholder="请输入验证码"
                    v-model="teacherInfo.code"
                    autocomplete="off"
                    style="width: 300px">
            <template #append>
              <el-button type="primary" @click="sendVerificationCode" >发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            注册
          </el-button>
          <el-button type="primary" style="margin-left: 70px" @click="toLogin()">
            去登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import type {FormInstance, FormRules} from 'element-plus';
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus';
import {createStudent, createTeacher, verificationCode} from "@/request/login/login"
import {query} from "@/request/school/query";

interface TeacherInfo {
  collegeId: string
  teacherId: string
  teacherName: string
  teacherPassword: string
  idCardNo: string
  teacherEmail: string
  code: string
  authorityId: string
  status: string
  description: string
}

interface StudentInfo {
  collegeId: string
  studentId: string
  studentPassword: string
  studentName: string
  idCardNo: string
  studentEmail: string
  code: string
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
interface College {
  id: number,
  collegeId: string,
  collegeName: string,
}

const password=ref();
const collegeList = ref<College[]>([]);
const optionsCollege = ref([]);
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const studentInfo=ref<StudentInfo>({
  collegeId: '',
  studentId: '',
  studentPassword: '',
  studentName: '',
  idCardNo: '',
  studentEmail: '',
  code: '',
  gender: '1',
  status: '1',
  authorityId: '4',
  description: '',
})
const teacherInfo=ref<TeacherInfo>({
  collegeId: '',
  teacherId: '',
  teacherName: '',
  teacherPassword: '',
  idCardNo: '',
  teacherEmail: '',
  code: '',
  authorityId: '3',
  status: '1',
  description: '',
})
const identity=ref('')

const rules = {
  teacherId: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 10, max: 10, message: '账号的长度在10位', trigger: 'blur'},
  ],
  teacherPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 10, message: '密码的长度在3-10之间', trigger: 'blur'},
  ],
  mobilePhone:[
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {min: 11, max: 11, message: '密码的长度在11位', trigger: 'blur'},
  ],
  studentId: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 10, max: 10, message: '账号的长度在10位', trigger: 'blur'},
  ],
  studentPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 10, message: '密码的长度在3-10之间', trigger: 'blur'},
  ],
};
const toLogin=()=>{
  router.push("/")
}
const getOptions=async ()=>{
  await query().then((res) => {
    console.log(res.data.data);
    collegeList.value = res.data.data;
    for (let i = 0; i < collegeList.value.length; i++) {
      optionsCollege.value.push({
        value: collegeList.value[i].collegeId,
        label: collegeList.value[i].collegeName,
      })
    }
  })
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if(password.value!==studentInfo.value.studentPassword&&password.value!==teacherInfo.value.teacherPassword){
    ElMessage.error("两次密码不一致")
  }else {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      // 处理登录成功的情况
      if (valid) {
        if (identity.value === 'student') {
          const res = await createStudent(studentInfo.value);
          if(res.data){
            ElMessage.success("创建成功")
            router.push("/")
          }else {
            ElMessage.error("未知错误")
          }
        } else if (identity.value === 'teacher') {
          const res = await createTeacher(teacherInfo.value);
          if(res.data){
            ElMessage.success("创建成功")
            router.push("/")
          }else {
            ElMessage.error("未知错误")
          }
        }
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
}

const sendVerificationCode=async ()=> {
  if (identity.value === 'student') {
    const res=await verificationCode(studentInfo.value.studentEmail)
    if(res.data.data){
      ElMessage.success("验证码已发送")
    }else {
      ElMessage.error("发送失败")
    }
  }else if (identity.value === 'teacher') {
    const res=await verificationCode(teacherInfo.value.teacherEmail)
    if(res.data.data){
      ElMessage.success("验证码已发送")
    }else {
      ElMessage.error("发送失败")
    }
  }
};
onMounted(async () => {
  await getOptions();
});

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
