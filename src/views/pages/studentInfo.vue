<template>
  <div style="width: 100%;height: 100%;">
    <el-card shadow="hover" style="margin-left: 100px;margin-right: 100px;height: 10%">
      <el-select v-model="collegeID" placeholder="选择学院" style="width: 200px" size="large" @change="selectByCollege">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
            {{ item.value }}
          </span>
        </el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入学号"
                size="large" style="width: 400px;margin-left: 5%"/>
      <el-button size="large" style="" type="primary" @click="selectStudent">查询学生
      </el-button>
      <el-button round size="large" style="margin-left: 100px" type="success" @click="addStudent">新增学生
      </el-button>
    </el-card>
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="学号">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <Collection/>
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.studentId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            <el-text size="large">{{ scope.row.studentName }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="所属学院">
          <template #default="scope">
            <el-text size="large">{{ scope.row.collegeName }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-text v-if="scope.row.status==='1'" size="large" type="primary">正常</el-text>
            <el-text v-else size="large" type="danger">注销</el-text>
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
          :show-close="false"
          v-model="centerDialogVisible"
          align-center
          title="修改学生"
          width="500"
      >
        <el-form :model="changeData" label-width="100px">
          <el-form-item label="学号">
            <el-input v-model="changeData.studentId"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="changeData.studentName"></el-input>
          </el-form-item>
          <el-form-item label="所属学院">
            <el-select v-model="changeData.collegeId" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                >
        {{ item.value }}
      </span>
              </el-option>
            </el-select>
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
          <el-form-item label="状态">
            <el-select
                v-model="changeData.status"
                placeholder="Select"
                size="large"
            >
              <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="falseChangeStudent()">
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
          align-center
          title="新增学生"
          width="500"
      >
        <el-form :model="insertData" label-width="100px">
          <el-form-item label="学号">
            <el-input v-model="insertData.studentId"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="insertData.studentName"></el-input>
          </el-form-item>
          <el-form-item label="所属学院">
            <el-select v-model="insertData.collegeId" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                >
        {{ item.value }}
      </span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="insertData.studentPassword"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="insertData.idCardNo"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="insertData.studentEmail"></el-input>
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
import {Collection} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {add, deleteByIdStudent, getAll, selectLike, updateStudent} from "@/request/student/student";
import {query, queryStudentsByCollegeID, queryTeachersByCollegeID} from "@/request/school/query";

interface Student {
  id: number
  collegeId: string
  collegeName: string
  studentId: string
  studentPassword: string
  studentName: string
  idCardNo: string
  studentEmail: string
  gender: string
  status: string
  authorityId: string
  description: string
}

interface StudentInfo {
  collegeId: string
  studentId: string
  studentPassword: string
  studentName: string
  idCardNo: string
  studentEmail: string
  gender: string
  status: string
  authorityId: string
  description: string
}

interface College {
  id: number,
  collegeId: string,
  collegeName: string,
}

const optionsStatus=[
  {
    value: '1',
    label: '正常',
  },
  {
    value: '0',
    label: '注销',
  }
]
const falseChangeStudent=async ()=>{
  centerDialogVisible.value=false;
  await fetchData();
}
const collegeList = ref<College[]>([]);
const options = ref([]);
const collegeID=ref('');
const centerDialogVisible = ref(false);
const centerDialogVisible1 = ref(false);
const changeData = ref<Student>();
const insertData = ref<StudentInfo>({
  collegeId: '',
  studentId: '',
  studentPassword: '',
  studentName: '',
  idCardNo: '',
  studentEmail: '',
  gender: '1',
  status: '1',
  authorityId: '4',
  description: '',
});
const input = ref<string>('')
const tableData = ref<Student[]>([]);

const updateTeacherInfo = (data: Student) => {
  changeData.value = data;
  centerDialogVisible.value = true;
}
const addStudent = () => {
  centerDialogVisible1.value = true;
}
const selectByCollege = async ()=>{
  console.log(collegeID.value)
  const res =await queryStudentsByCollegeID(collegeID.value)
  tableData.value = res.data.data;
  if(tableData.value.length==0){
    ElMessage.success("暂无数据")
  }
  for (let i = 0; i < tableData.value.length; i++) {
    for (let j = 0; j < collegeList.value.length; j++) {
      if (tableData.value[i].collegeId == collegeList.value[j].collegeId) {
        tableData.value[i].collegeName = collegeList.value[j].collegeName;
      }
    }
    tableData.value[i].studentPassword='';
  }
}
const addStudentInfo = async () => {
  const res = await add(insertData.value)
  if (res.data) {
    ElMessage.success("新增成功")
  } else {
    ElMessage.error("新增失败")
  }
  centerDialogVisible1.value = false;
  insertData.value.studentId = ''
  insertData.value.studentName = ''
  insertData.value.studentPassword = ''
  insertData.value.idCardNo = ''
  insertData.value.studentEmail = ''
  insertData.value.description = ''
  insertData.value.collegeId = ''
  await fetchData();
}
const deleteStudent = async (id: string) => {
  const res = await deleteByIdStudent(id);
  if (res.data.data) {
    ElMessage.success("删除成功")
  } else {
    ElMessage.error("删除失败")
  }
  await fetchData();
}
const changeStudent = async (data: Student) => {
  const res = await updateStudent(data);
  if (res.data) {
    ElMessage.success("修改成功")
    centerDialogVisible.value = false;
    await fetchData();
  } else {
    ElMessage.error("修改失败")
  }
}
const selectStudent = async () => {
  collegeID.value=''
  if (input.value === '') {
    ElMessage.success("查询成功")
    await fetchData();
  } else {
    const res = await selectLike(input.value);
    input.value = '';
    if (res.data.code === 200) {
      tableData.value = res.data.data;
      ElMessage.success("查询成功")
    } else {
      ElMessage.error("查询失败")
    }
  }
}
// 模拟后端返回的数据
const getOptions=async ()=>{
  await query().then((res) => {
    console.log(res.data.data);
    collegeList.value = res.data.data;
    for (let i = 0; i < collegeList.value.length; i++) {
      options.value.push({
        value: collegeList.value[i].collegeId,
        label: collegeList.value[i].collegeName,
      })
    }
  })
}
const fetchData = async () => {
  getAll().then((res) => {
        tableData.value = res.data.data;
        for (let i = 0; i < tableData.value.length; i++) {
          for (let j = 0; j < collegeList.value.length; j++) {
            if (tableData.value[i].collegeId == collegeList.value[j].collegeId) {
              tableData.value[i].collegeName = collegeList.value[j].collegeName;
            }
          }
          tableData.value[i].studentPassword='';
        }
      }
  ).catch((error) => {
    console.error("出现错误", error);
  })
};

onMounted(async () => {
  await getOptions();
  await fetchData();
});
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
