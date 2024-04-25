<template>
  <div style="width: 100%;height: 100%;">
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-button size="large" style="margin-bottom: 10px" type="primary" @click="doBack">返回列表
      </el-button>
      <el-table
          :data="tableData"
          style="width: 100%;"
          height="700px"
          :row-class-name="tableRowClassName"
      >
        <el-table-column label="学号">
          <template #default="scope">
            <el-text v-if="scope.row.totalScore!==0"  size="large">{{scope.row.studentId}}</el-text>
            <el-text v-else type="danger" size="large">{{scope.row.studentId}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            <el-text v-if="scope.row.totalScore!==0"  size="large">{{scope.row.studentName}}</el-text>
            <el-text v-else type="danger" size="large">{{scope.row.studentName}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="成绩">
          <template #default="scope">
            <el-text v-if="scope.row.totalScore!==0" type="primary" size="large">{{scope.row.totalScore}}</el-text>
            <el-text v-else type="danger" size="large">{{scope.row.totalScore}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: left;">
            <el-button v-if="scope.row.totalScore!==0"
                size="small"
                type="success"
                @click="toSeeStudent(scope.row)"
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
import {onMounted} from 'vue';
import {useStudentStore} from '@/stores/counter'
import router from "@/router";


interface StudentScoreDto{
  studentId:string,
  studentName:string,
  examId:string,
  totalScore:number,
}
const studentStore = useStudentStore();
const tableData=studentStore.studentScoreList;

const toSeeStudent=(data:StudentScoreDto)=>{
  studentStore.setStudentInfo(data);
  router.push("oneStudent");
  console.log(data)
}

const doBack = () => {
  router.push("seeScore");
}
const tableRowClassName = ({row, rowIndex}) => {
  if (row.totalScore === 0) {
    return 'warning-row';
  }else {
    return 'success-row';
  }
};
// 模拟后端返回的数据
onMounted(async () => {
  console.log(tableData)
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
