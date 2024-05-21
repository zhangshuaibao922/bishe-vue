<template>
  <div style="width: 100%;height: 100%;display: flex">
    <el-card shadow="never" style="width: 50%;height: 90%;">
      <el-button size="large" style="margin-bottom: 10px" type="primary" @click="doBack">返回列表
      </el-button>
      <el-table
          :data="tableData"
          style="width: 100%;"
          height="700px"
      >
        <el-table-column label="题号" width="50px">
          <template #default="scope">
            <el-text v-if="scope.row.avgScore!==0"  size="large">{{scope.row.answerId}}</el-text>
            <el-text v-else type="danger" size="large">{{scope.row.answerId}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template #default="scope">
            <el-button v-if="scope.row.avgScore !== 0" size="large" @click="getURL(scope.row)">{{scope.row.answerUrl}}</el-button>
            <el-button v-else size="large" type="danger" disabled>暂无</el-button>
          </template>
        </el-table-column>
        <el-table-column label="得分" width="100px">
          <template #default="scope">
            <el-text v-if="scope.row.avgScore!==0&&scope.row.avgScore!=='NaN'" type="primary" size="large">{{scope.row.avgScore}}</el-text>
            <el-text v-if="scope.row.avgScore==='NaN'" type="danger" size="large">0</el-text>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="height: 100%;width: 50%">
      <el-image style="margin-left: 50px;margin-top: 20px;width: 500px; height: 700px" :src="url" :fit="'contain'" />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useStudentStore} from '@/stores/counter'
import router from "@/router";
import {getStudentScore} from "@/request/score/score";


interface AnswerDto{
  paperId:string,
  answerId:string,
  answerUrl:string,
  avgScore:number,
}
const url=ref('');
const studentStore = useStudentStore();
const studentInfo=studentStore.studentInfo;
const tableData=ref<AnswerDto[]>([]);
const doBack = () => {
  router.push("studentScore");
}
const getURL=(data:AnswerDto)=>{
  url.value=data.answerUrl
}
const getData=async ()=>{
  const res=await getStudentScore(studentInfo)
  tableData.value=res.data.data;
  console.log("成绩")
  console.log(tableData.value)
}
// 模拟后端返回的数据
onMounted(async () => {
  console.log('123')
  console.log(studentInfo)
  await getData();
});
</script>

<style scoped>
.el-table .warning-row {
  background: red;
}

.el-table .success-row {
  background: white;
}
</style>
