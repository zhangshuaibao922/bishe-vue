<template>
  <div style="width: 100%;height: 100%;">
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-button size="large" style="margin-bottom: 10px" type="primary" @click="doBack">返回列表
      </el-button>
      <el-table
          :data="tableData"
          style="width: 100%;"
          height="700px"
      >
        <el-table-column label="题号" width="200px">
          <template #default="scope">
            <el-text v-if="scope.row.avgScore!==0"  size="large">{{scope.row.answerId}}</el-text>
            <el-text v-else type="danger" size="large">{{scope.row.answerId}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template #default="scope">
            <el-link v-if="scope.row.avgScore!==0"  size="large">{{scope.row.answerUrl}}</el-link>
            <el-link v-else type="danger" size="large">{{scope.row.answerUrl}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="得分">
          <template #default="scope">
            <el-text v-if="scope.row.avgScore!==0" type="primary" size="large">{{scope.row.avgScore}}</el-text>
            <el-text v-else type="danger" size="large">{{scope.row.avgScore}}</el-text>
          </template>
        </el-table-column>
      </el-table>
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
const studentStore = useStudentStore();
const studentInfo=studentStore.studentInfo;
const tableData=ref<AnswerDto[]>([]);
const doBack = () => {
  router.push("studentScore");
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
