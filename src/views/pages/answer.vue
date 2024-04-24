<template>
  <div v-show="false">
    <input  type="file" ref="fileInput" multiple webkitdirectory @change="handleFolderChange" accept="image/png, image/jpeg, image/gif, image/jpg">
    <button @click="uploadImages">上传图片</button>
  </div>
  <el-card v-loading="loading" style="margin-top: 10px;margin-left: 50px;margin-right: 50px;height: 33%">
    <el-form label-position="left" label-width="100px" :model="form">
      <el-form-item label="课程编号">
        <el-input v-model="form.lessonId"></el-input>
      </el-form-item>
      <el-form-item label="考试名称">
        <el-input v-model="form.examName"></el-input>
      </el-form-item>
      <el-form-item label="答题卡模版">
        <el-input v-model="form.modelName"></el-input>
      </el-form-item>
      <el-form-item label="考试日期">
        <el-input v-model="form.examData"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="show" style="text-align: center;">
      <el-button @click="select">
        选择文件夹
      </el-button>
      <el-button type="primary" @click="uploadImages">
        上传答题卡
      </el-button>
    </div>
  </el-card>
  <el-card v-loading="loading2" shadow="never" style="margin-left: 50px;margin-right: 50px;height: 60%;">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
      <el-text size="large" type="primary">课程 {{form.lessonId}} 的 {{form.examName}} 考试已录入答题卡如下</el-text>
      <el-button v-if="show" type="primary" style="margin-top: 10px;" @click="doCut">进行答题卡切割</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        height="430px"
        :row-class-name="tableRowClassName">
      <el-table-column
          prop="studentId"
          label="学号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="studentName"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          label="答题卡链接">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon v-if="scope.row.paperUrl!==''"><Paperclip /></el-icon>
            <a :href="scope.row.paperUrl" target="_blank" style="margin-left: 10px">{{ scope.row.paperUrl }}</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { Paperclip } from '@element-plus/icons-vue'
import {ref, onMounted} from 'vue';
import { upload } from "@/request/upload/upload";
import {ElMessage, TableColumnCtx} from "element-plus";
import {queryByIdExam,cutting} from "@/request/answer/answer"

interface Student{
  studentId:string,
  studentName:string,
  paperUrl:string,
}
interface ExamInfo{
  lessonId:string,
  examId:string,
  examName:string,
  examData:string,
  modelName:string,
  paperClassId:string,
}
interface SpanMethodProps {
  row: Student
  column: TableColumnCtx<Student>
  rowIndex: number
  columnIndex: number
}
const show=ref(true);
const loading2=ref(false);
// 定义 fileInput 的引用
const fileInput = ref(null);
const loading=ref(false);
const tableData=ref<Student[]>([]);
const form = ref<ExamInfo>({
  lessonId:'',
  examId:'',
  examName:'',
  examData:'',
  modelName:'',
  paperClassId:'',
});

// const objectSpanMethod = ({
//                             row,
//                             column,
//                             rowIndex,
//                             columnIndex,
//                           }: SpanMethodProps) => {
//   if (columnIndex === 0) {
//     if (rowIndex % 2 === 0) {
//       return {
//         rowspan: 2,
//         colspan: 1,
//       }
//     } else {
//       return {
//         rowspan: 0,
//         colspan: 0,
//       }
//     }
//   }
// }
const tableRowClassName = ({row, rowIndex}) => {
  if (row.paperUrl === '') {
    return 'warning-row';
  }else {
    return 'success-row';
  }
};


const doCut= async ()=>{
  loading.value=true;
  loading2.value=true;
  console.log(form.value);
  const res=await cutting(form.value.paperClassId,form.value.examId);
  console.log(res.data.data);
  if(res.data.data){
    ElMessage.success("切割完成，请前往批阅")
  }else {
    ElMessage.error("切割失败，稍后重试")
  }
  loading.value=false;
  loading2.value=false;
}

const select=async ()=>{
  fileInput.value.click();
}
const getLocal=()=>{
  form.value.lessonId=localStorage.getItem('examLessonId');
  form.value.examId=localStorage.getItem('examId');
  form.value.examName=localStorage.getItem('examName');
  form.value.examData=localStorage.getItem('examData');
  form.value.modelName=localStorage.getItem('modelName');
  form.value.paperClassId=localStorage.getItem('paperClassId');
}
const handleFolderChange = () => {
  const files = fileInput.value?.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        console.log('选择的文件:', file.name);
      }
    }
    ElMessage.success("选择成功")
  }
};

const getTableData= async ()=>{
  const  res=await queryByIdExam(form.value.lessonId,form.value.examId);
  if(res.data.data===null){
    ElMessage.success("没有学生选择该课程")
    show.value=false;
    loading2.value=false;
  }else {
    tableData.value=res.data.data;
    loading2.value=false;
    if(res.data.message==="部分未上传"){
      ElMessage.success(res.data.message)
    }else {
      ElMessage.success("上传答题卡成功")
    }
  }
}

const uploadImages = async () => {
  loading.value=true
  const files = fileInput.value?.files;
  if (!files || files.length === 0) {
    console.error('请选择要上传的图片');
    loading.value=false;
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // 检查文件的 MIME 类型
    if (file.type.startsWith('image/')) {
      formData.append('images', file);
    } else {
      console.warn(`文件 '${file.name}' 的类型不是图片，将被忽略`);
    }
  }

  try {
    await upload(form.value.lessonId,form.value.examId, formData);
    console.log('上传成功');
    loading.value=false;
    loading2.value=true;
    await getTableData();
  } catch (error) {
    console.error('上传失败:', error);
  }
};

onMounted( async () => {
  await getLocal();
  await getTableData();
});
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: white;
}
</style>
