<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 10%;background: snow">
      <el-input v-model="input" style="width: 500px;margin-top: 15px;margin-left: 20%"
                placeholder="请输入课号" size="large"/>
      <el-button type="primary" @click="selectStudent" size="large" style="margin-top: 15px">查询学生
      </el-button>

      <el-button type="success" round @click="addLesson" size="large" style="margin-top: 15px;margin-left: 100px">新增课程
      </el-button>
    </div>
    <div style="margin-left: 100px;margin-right: 100px;height: 90%;background: white">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="课程号" width="400">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Collection /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.lessonId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="400">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>学时: {{ scope.row.hours }}</div>
                <div>学分: {{ scope.row.score }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.lessonName }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="updateLesson(scope.row)"
            >修改</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="deleteLesson(scope.row.id)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          v-model="centerDialogVisible"
          title="修改课程"
          width="500"
          align-center
      >
        <el-form :model="form" label-width="100px">
          <el-form-item label="课程ID">
            <el-input v-model="form.lessonId"></el-input>
          </el-form-item>
          <el-form-item label="课程名称">
            <el-input v-model="form.lessonName"></el-input>
          </el-form-item>
          <el-form-item label="学分">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <el-form-item label="学时">
            <el-input v-model="form.hours"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="change(form)">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog
          v-model="centerDialogVisible1"
          title="新增课程"
          width="500"
          align-center
      >
        <el-form :model="form1" label-width="100px">
          <el-form-item label="课程ID">
            <el-input v-model="form1.lessonId"></el-input>
          </el-form-item>
          <el-form-item label="课程名称">
            <el-input v-model="form1.lessonName"></el-input>
          </el-form-item>
          <el-form-item label="学分">
            <el-input v-model="form1.score"></el-input>
          </el-form-item>
          <el-form-item label="学时">
            <el-input v-model="form1.hours"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">
              取消
            </el-button>
            <el-button type="primary" @click="add(form1)">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import { Collection } from '@element-plus/icons-vue'
import {queryAll, update,addByInfo,deleteById,queryById} from "@/request/class/class";
import {ElMessage} from "element-plus";

interface Lesson {
  id: string
  lessonId: string
  lessonName: string
  hours: string
  score: string
}
interface LessonInfo {
  lessonId: string
  lessonName: string
  hours: string
  score: string
}
const form = ref<Lesson>({
  id: '-1',
  lessonId: '',
  lessonName: '',
  hours: '',
  score: '',
});
const form1 = ref<LessonInfo>({
  lessonId: '',
  lessonName: '',
  hours: '',
  score: ''
});
const centerDialogVisible = ref(false)
const centerDialogVisible1 = ref(false)
const input = ref<string>('')

const selectStudent=async ()=>{
  if(input.value==null||input.value.length==0){
    ElMessage.error("请输入课程号")
  }else {
    const res=await queryById(input.value);
    if(res.data.id==-1) {
      ElMessage.error("课程不存在")
    }else {
      console.log(res.data)
    }
  }
}

const deleteLesson=async (id:string)=>{
  console.log(id)
  const res =await deleteById(id);
  console.log(res.data);
  if (res.data) {
    ElMessage.success("删除成功");
    await fetchData();
  } else {
    ElMessage.error("删除失败");
  }
}

const addLesson=()=>{
  centerDialogVisible1.value=true;
}
const add= async (data:LessonInfo)=>{
  const res=await addByInfo(data);
  console.log(res.data);
  if (res.data) {
    ElMessage.success("新增成功");
    centerDialogVisible1.value = false;
    form1.value.lessonId='';
    form1.value.lessonName='';
    form1.value.hours='';
    form1.value.score='';
    await fetchData();
  } else {
    ElMessage.error("新增失败");
    centerDialogVisible1.value = false;
  }
}
const tableData= ref<Lesson[]>([]);
// 模拟后端返回的数据
const fetchData = () => {
  queryAll().then((res) => {
        console.log(res.data.data)
        tableData.value = res.data.data;
      }
  ).catch((error) => {
    console.error("出现错误", error);
  })
};
const updateLesson=(data:Lesson)=>{
  centerDialogVisible.value=true;
  form.value.id=data.id
  form.value.lessonId=data.lessonId
  form.value.lessonName=data.lessonName
  form.value.hours=data.hours
  form.value.score=data.score
}

const change= async (data:Lesson)=>{
  const res=await update(data);
  console.log(res.data);
  if (res.data) {
    ElMessage.success("修改成功");
    centerDialogVisible.value = false;
    await fetchData();
  } else {
    ElMessage.error("修改失败");
    centerDialogVisible.value = false;
  }
}

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
