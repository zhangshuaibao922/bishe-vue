<template>
  <div style="width: 100%;height: 100%;">
    <el-card style="margin-left: 100px;margin-right: 100px;height: 10%"  shadow="hover">
      <el-input v-model="input" style="width: 400px;margin-left: 20%"
                placeholder="请输入学号" size="large"/>
      <el-button type="primary" @click="selectStudent" size="large" style="">查询学生
      </el-button>
      <el-button round size="large" style="margin-left: 100px" type="success" @click="addStudent">新增学生
      </el-button>
    </el-card>
    <el-card style="margin-left: 100px;margin-right: 100px;height: 90%;"  shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="学号">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Collection /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.studentId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            <el-text size="large">{{scope.row.studentName}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="密码">
          <template #default="scope">
            <el-text size="large">{{scope.row.studentPassword}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
              <el-text v-if="scope.row.status==='1'" type="primary" size="large">正常</el-text>
              <el-text v-else type="primary" size="large">注销</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="small" @click="updateTeacherInfo(scope.row)">
              修改
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="deleteStudent(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog
          v-model="centerDialogVisible"
          title="修改教师"
          width="500"
          align-center
      >
        <el-form :model="changeData" label-width="100px">
          <el-form-item label="教师ID">
            <el-input v-model="changeData.studentId"></el-input>
          </el-form-item>
          <el-form-item label="教师名称">
            <el-input v-model="changeData.studentName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="changeData.studentPassword"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="changeData.idCardNo"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="changeData.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="changeData.description"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="changeStudent(changeData)">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog
          v-model="centerDialogVisible1"
          title="新增学生"
          width="500"
          align-center
      >
        <el-form :model="insertData" label-width="100px">
          <el-form-item label="学号">
            <el-input v-model="insertData.studentId"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="insertData.studentName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="insertData.studentPassword"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="insertData.idCardNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="insertData.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="insertData.description"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">
              取消
            </el-button>
            <el-button type="primary" @click="addStudentInfo()">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import { Collection } from '@element-plus/icons-vue'
import {
  queryAll,
  update,
  addByInfo,
  deleteById,
  queryById,
  queryAllTeacher,
  updateTeacher, queryTeachers, deleteByIdTeacher, insertTeacherInfo
} from "@/request/class/class";
import {ElMessage} from "element-plus";
import router from "@/router";
import {add, deleteByIdStudent, getAll, selectLike, updateStudent} from "@/request/student/student";

interface Student {
  id: number
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
interface StudentInfo {
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

const centerDialogVisible=ref(false);
const centerDialogVisible1=ref(false);
const changeData=ref<Student>();
const insertData=ref<StudentInfo>({
  classId: '10',
  studentId: '',
  studentPassword: '',
  studentName: '',
  idCardNo: '',
  mobilePhone: '',
  gender: '1',
  status: '1',
  authorityId: '4',
  description: '',
});
const input = ref<string>('')
const tableData= ref<Student[]>([]);

const updateTeacherInfo=(data:Student)=>{
  changeData.value=data;
  centerDialogVisible.value=true;
}
const addStudent=()=>{
  centerDialogVisible1.value=true;
}
const addStudentInfo=async ()=>{
  const res=await add(insertData.value)
  if(res.data){
    ElMessage.success("新增成功")
  }else {
    ElMessage.error("新增失败")
  }
  centerDialogVisible1.value=false;
  insertData.value.studentId=''
  insertData.value.studentName=''
  insertData.value.studentPassword=''
  insertData.value.idCardNo=''
  insertData.value.mobilePhone=''
  insertData.value.description=''
  await fetchData();
}
const deleteStudent=async (id:string)=>{
  const res=await deleteByIdStudent(id);
  if(res.data.data){
    ElMessage.success("删除成功")
  }else {
    ElMessage.error("删除失败")
  }
  await fetchData();
}
const changeStudent=async (data:Student)=>{
  const res=await updateStudent(data);
  if(res.data){
    ElMessage.success("修改成功")
    centerDialogVisible.value=false;
    await fetchData();
  }else {
    ElMessage.error("修改失败")
  }
}
const selectStudent=async ()=>{
  if(input.value===''){
    ElMessage.success("查询成功")
    await fetchData();
  }else {
    const res=await selectLike(input.value);
    input.value='';
    if(res.data.code===200){
      tableData.value=res.data.data;
      ElMessage.success("查询成功")
    }else {
      ElMessage.error("查询失败")
    }
  }
}
// 模拟后端返回的数据
const fetchData = () => {
  getAll().then((res) => {
        console.log(res.data.data)
        tableData.value = res.data.data;
      }
  ).catch((error) => {
    console.error("出现错误", error);
  })
};

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
