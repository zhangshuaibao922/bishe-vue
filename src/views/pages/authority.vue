<template>
  <div style="width: 100%;height: 100%;">
    <el-card style="margin-left: 100px;margin-right: 100px;height: 10%"  shadow="hover">
      <el-input v-model="input" style="width: 400px;margin-left: 20%"
                placeholder="请输入教师ID" size="large"/>
      <el-button type="primary" @click="selectTeacher" size="large" style="">查询教师
      </el-button>
    </el-card>
    <el-card style="margin-left: 100px;margin-right: 100px;height: 90%;"  shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="教师ID">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Collection /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.teacherId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template #default="scope">
            <el-text size="large">{{scope.row.teacherName}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
              <el-text v-if="scope.row.status==='1'" type="primary" size="large">正常</el-text>
              <el-text v-else type="danger" size="large">注销</el-text>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="300">
          <template #default="scope">
            <el-select
                v-model="scope.row.authorityId"
                placeholder="Select"
                size="large"
                style="width: 240px"
                @change="changeTeacher(scope.row)"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>

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
  updateTeacher, queryTeachers
} from "@/request/class/class";
import {ElMessage} from "element-plus";
import router from "@/router";

interface Teacher {
  id: number
  collegeId: string
  teacherId: string
  teacherName: string
  teacherPassword: string
  idCardNo: string
  mobilePhone: string
  authorityId: string
  status: string
  description: string
}
const options = [
  {
    value: '1',
    label: '管理员',
  },
  {
    value: '3',
    label: '教师',
  },
]

const input = ref<string>('')
const tableData= ref<Teacher[]>([]);
const changeTeacher=async (data:Teacher)=>{
  const res=await updateTeacher(data);
  if(res.data){
    ElMessage.success("修改成功")
    await fetchData();
  }else {
    ElMessage.error("修改失败")
  }
}
const selectTeacher=async ()=>{
  if(input.value===''){
    ElMessage.success("查询成功")
    await fetchData();
  }else {
    const res=await queryTeachers(input.value);
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
  queryAllTeacher().then((res) => {
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
