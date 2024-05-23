<template>
  <div style="width: 100%;height: 100%;" v-loading="loading">
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-button size="large" style="margin-bottom: 10px" type="primary" @click="doBack">返回列表
      </el-button>
      <el-table
          :data="tableData"
          border
          height="700px"
          style="width: 100%;"
      >
        <el-table-column label="试题">
          <template #default="scope">
            <span>第{{ scope.row.answerId}}道题</span>
          </template>
        </el-table-column>
        <el-table-column label="总数" prop="answerNumbers"/>
        <el-table-column label="满分" prop="count"/>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: left;">
              <el-button
                  size="small"
                  type="success"
                  @click="toSetScore(scope.row)"
              >进行批阅
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
import {queryByTeacherIdAndExamSet} from "@/request/score/score"
import router from "@/router";

interface SettingDto {
  id: number,
  num: number,
  count: number,
  answerNumbers: number,
  examSet: string,
  answerId: string,
  teacherId: string,
  allScore: string,
}


const tableData = ref<SettingDto[]>([]);
const loading=ref(true)

const doBack = () => {
  router.push("score");
}
// 模拟后端返回的数据
const getTest = async () => {
  queryByTeacherIdAndExamSet(localStorage.getItem("id"), localStorage.getItem("examId")).then((res) => {
    tableData.value = res.data.data;
    console.log(tableData.value);
    if(res.data.message==='存在异常得分情况，请重新批阅'){
      ElMessage.error(res.data.message)
      queryByTeacherIdAndExamSet(localStorage.getItem("id"), localStorage.getItem("examId")).then((res)=>{
        tableData.value = res.data.data;
      })
    }else {
      if (res.status === 200) {
        ElMessage.success("查询成功")
      }
    }

  }).catch((error) => {
    console.error("出现错误", error);
  })
  loading.value=false;
}
const toSetScore=(data:SettingDto)=>{
  console.log(data.teacherId)
  localStorage.setItem("answerId",data.answerId)
  localStorage.setItem("count",String(data.count))
  localStorage.setItem("examSet",data.examSet)
  localStorage.setItem("num",String(data.num))
  localStorage.setItem("teacherId",data.teacherId)
  router.push("getScore")
}
onMounted(async () => {
  await getTest();
});
</script>

<style scoped>
</style>
