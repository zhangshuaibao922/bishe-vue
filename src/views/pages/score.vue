<template>
  <div style="width: 100%;height: 100%;" v-loading="loading">
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-radio-group v-model="examClass" style="margin-bottom: 10px" size="large" @change="toSelectExam">
        <el-radio-button value="1">测试</el-radio-button>
        <el-radio-button value="2">考试</el-radio-button>
      </el-radio-group>
      <el-table
          :data="tableData"
          border
          style="width: 100%;"
          height="700px"
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
            <el-text v-if="scope.row.isDelete!==1" type="primary" size="large">正常</el-text>
            <el-text v-else type="danger" size="large">结束</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: left;">
            <el-button v-if="scope.row.isDelete!==1"
                size="small"
                type="success"
                @click="toSetScore(scope.row)"
            >题目列表
            </el-button>
              <el-button v-if="scope.row.isDelete!==1"
                         size="small"
                         type="danger"
                         @click="toChangeStatus(scope.row)"
              >结束批阅
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
import {ElMessage} from "element-plus";
import { scoreQueryByExamClass} from "@/request/test/test"
import {updateExam} from "@/request/score/score"
import router from "@/router";

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
}

const loading=ref(true)
const examClass=ref('1')
const tableData = ref<Exam[]>([]);



const toSetScore=(data:Exam)=>{
  localStorage.setItem('examId',data.examId);
  router.push("setScore");
}
const toSelectExam = async () => {
  console.log(examClass.value);
  await getTest();
}
const toChangeStatus= async (data:Exam)=>{
  data.isDelete=1
  const res=await updateExam(data);
  if(res.data){
    ElMessage.success("该考试已截止")
    await getTest();
  }
}
// 模拟后端返回的数据
const getTest = () => {
  scoreQueryByExamClass(examClass.value).then((res) => {
    tableData.value = res.data.data;
    console.log(tableData.value)
    if(res.status===200) {
      ElMessage.success("查询成功")
    }
  }).catch((error) => {
    console.error("出现错误", error);
  })
  loading.value=false
}

onMounted(async () => {
  await getTest();
});
</script>

<style scoped>
</style>
