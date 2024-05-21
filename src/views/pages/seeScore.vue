<template>
  <div v-loading="loading" style="width: 100%;height: 100%;">
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-radio-group v-model="examClass" size="large" style="margin-bottom: 10px" @change="toSelectExam">
        <el-radio-button value="1">测试</el-radio-button>
        <el-radio-button value="2">考试</el-radio-button>
      </el-radio-group>
      <el-table
          :data="tableData"
          border
          height="700px"
          style="width: 100%;"
      >
        <el-table-column label="课程编号" prop="lessonId"/>
        <el-table-column label="考试名称" prop="examName"/>
        <el-table-column label="答题卡模版">
          <template #default="scope">
            <span v-if="scope.row.paperClassId!==''">{{ scope.row.modelName }}</span>
            <span v-else style="color:red;"> 暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="考试日期" prop="examData"/>
        <el-table-column label="考试状态">
          <template #default="scope">
            <el-text v-if="scope.row.isDelete!==1" size="large" type="primary">正常</el-text>
            <el-text v-else size="large" type="danger">批阅完成</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: left;">
              <el-button v-if="scope.row.isDelete===1"
                         size="small"
                         type="success"
                         @click="toSetScore(scope.row)"
              >查看成绩
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {useStudentStore} from '@/stores/counter'
import {ElMessage} from "element-plus";
import {querySeeScore, queryAllScore} from "@/request/score/score"
import router from "@/router";

interface StudentScoreDto {
  studentId: string,
  studentName: string,
  examId: string,
  totalScore: string,
}

interface Modelurl {
  paperClassId: string,
  url: number,
}

interface Exam {
  id: number,
  examId: string,
  lessonId: string,
  examName: string,
  examClass: string,
  examSet: string,
  paperClassId: string,
  modelName: string,
  examData: string,
  isDelete: number,
  models: Modelurl[],
}

const loading = ref(true)
const examClass = ref('1')
const tableData = ref<Exam[]>([]);
const studentStore = useStudentStore();
const studentId = ref('');

const toSetScore = async (data: Exam) => {
  studentId.value = '1';
  if (localStorage.getItem('authorityRole') === 'STUDENT') {
    studentId.value = localStorage.getItem('id');
  }
  const res = await queryAllScore(
      data.examId,
      data.lessonId,
      studentId.value,
  );
  localStorage.setItem('ScoreExamID', data.examId);
  studentId.value = '';
  studentStore.setStudentScoreList(res.data.data);
  router.push("studentScore");
}

const toSelectExam = async () => {
  console.log(examClass.value);
  await getTest();
}
// 模拟后端返回的数据
const getTest = () => {
  querySeeScore(examClass.value, localStorage.getItem('id')).then((res) => {
    tableData.value = res.data.data;
    if (res.data.code === 200) {
      ElMessage.success("查询成功")
    }
  }).catch((error) => {
    console.error("出现错误", error);
  })
  loading.value = false
}
onMounted(async () => {
  await getTest();
});
</script>

<style scoped>
</style>
