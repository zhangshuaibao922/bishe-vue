<template>
  <div style="width: 100%;height: 100%;">
    <el-card shadow="hover" style="margin-left: 100px;margin-right: 100px;height: 10%">
      <el-button size="large" style="" type="primary" @click="doBack">返回课程
      </el-button>
      <el-input v-model="input" placeholder="请输入学号"
                size="large" style="width: 400px;margin-left: 50px"/>
      <el-button size="large" style="" type="primary" @click="selectStudent">查询学生
      </el-button>

      <el-button round size="large" style="margin-left: 100px" type="success" @click="addStudent">新增学生
      </el-button>
    </el-card>
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="学号" width="400">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <Collection/>
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.studentId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="400">
          <template #default="scope">
            <el-popover effect="light" placement="top" trigger="hover" width="auto">
              <template #default>
                <div v-if="scope.row.gender==='1'">性别: 男</div>
                <div v-if="scope.row.gender==='0'">性别: 女</div>
                <div v-if="scope.row.status==='1'">状态: 正常</div>
                <div v-if="scope.row.status==='0'">状态: 注销</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.studentName }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
                size="small"
                type="danger"
                @click="deleteLesson(scope.row.studentId)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          v-model="centerDialogVisible1"
          align-center
          title="新增学生"
          width="500"
      >
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <el-form>
            <el-form-item label="学号">
              <el-input v-model="form" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
          <el-button style="margin-bottom: 20px" type="primary" @click="select(form)">
            搜索
          </el-button>
        </div>
        <el-table :data=student style="width: 100%">
          <el-table-column label="学号" width="160">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon>
                  <Collection/>
                </el-icon>
                <span style="margin-left: 10px">{{ scope.row.studentId }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="160">
            <template #default="scope">
              <el-popover effect="light" placement="top" trigger="hover" width="auto">
                <template #default>
                  <div v-if="scope.row.gender==='1'">性别: 男</div>
                  <div v-if="scope.row.gender==='0'">性别: 女</div>
                  <div v-if="scope.row.status==='1'">状态: 正常</div>
                  <div v-if="scope.row.status==='0'">状态: 注销</div>
                </template>
                <template #reference>
                  <el-tag>{{ scope.row.studentName }}</el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  size="small"
                  type="success"
                  @click="addStudentToClass(scope.row.studentId)"
              >添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>


    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {Collection} from '@element-plus/icons-vue'
import {queryAll, queryByStudentId, addByInfo, deleteById, queryById} from "@/request/student/student";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";


const router = useRouter();

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
}

interface ChooseInfo {
  lessonId: string
  studentId: string
}

const form = ref('');
const tableData = ref<Student[]>([]);
const student = ref<Student[]>([]);
const centerDialogVisible1 = ref(false);
const input = ref<string>('');
const loading = ref(true);
const doBack = () => {
  router.push(localStorage.getItem('class'));
}
const selectStudent = async () => {
  if (input.value == null || input.value.length == 0) {
    await fetchData();
  } else {
    const res = await queryByStudentId({
          lessonId: localStorage.getItem('lessonId'),
          studentId: input.value
        }
    );
    if (res.data.length == 0) {
      ElMessage.error("学生不存在")
    } else {
      ElMessage.success("查询成功");
      tableData.value = res.data
      console.log(res.data)
    }
    input.value = '';
  }
}

const deleteLesson = async (studentId: string) => {
  const res = await deleteById(studentId);
  if (res.data) {
    ElMessage.success("删除成功");
    await fetchData();
  } else {
    ElMessage.error("删除失败")
  }
}

const addStudent = () => {
  centerDialogVisible1.value = true;
}

// 模拟后端返回的数据
const fetchData = () => {
  queryAll(localStorage.getItem('lessonId')).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 201) {
          ElMessage.success("无学生选择该课程")
        }
        tableData.value = res.data.data;
      }
  ).catch((error) => {
    console.error("出现错误", error);
  })
  loading.value = false;
};

const select = async (studentId: string) => {
  if (studentId.length == 0) {
    ElMessage.error("请输入学号")
  }
  const res = await queryById(studentId);
  console.log(res.data);
  if (res.data.length == 0) {
    ElMessage.error("学生不存在")
  } else {
    ElMessage.success("请选择学生");
    student.value = res.data
  }
}
const addStudentToClass = async (studentId: string) => {
  const res = await addByInfo({
    lessonId: localStorage.getItem('lessonId'),
    studentId: studentId
  })
  if (res.data) {
    ElMessage.success("添加成功");
    await fetchData();
  } else {
    ElMessage.error("已添加，无需重复");
  }
}
onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
