<template>
  <div style="width: 100%;height: 100%;">
    <el-card shadow="hover" style="margin-left: 100px;margin-right: 100px;height: 10%">
      <el-input v-model="input" placeholder="请输入考试名称"
                size="large" style="width: 400px;margin-left: 50px"/>
      <el-button size="large" style="" type="primary" @click="selectTest">查询考试
      </el-button>
      <el-button round size="large" style="margin-left: 100px" type="success" @click="addTest">新增测试
      </el-button>
    </el-card>
    <el-card shadow="never" style="margin-left: 100px;margin-right: 100px;height: 90%;">
      <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%;"
          height="700px"
      >
        <el-table-column label="课程编号" prop="lessonId" width="180"/>
        <el-table-column label="考试名称" prop="examName"/>
        <el-table-column label="答题卡模版" prop="ModelName">
          <template #default="scope">
            <span v-if="scope.row.paperClassId!==''">{{ scope.row.modelName }}</span>
            <span v-else style="color:red;"> 暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="考试日期" prop="examData"/>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: left;">
            <el-button
                v-if="scope.row.paperClassId===''"
                size="small"
                type="success"
                @click="addTeacherToClass(scope.row)"
                style="margin-right: 12px"
            >模版设置
            </el-button>
            <el-button
                v-else
                size="small"
                type="primary"
                @click="toAnswer(scope.row)"
            >录入答题卡
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="deleteById(scope.row.id)"
            >删除
            </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          v-model="centerDialogVisible"
          align-center
          title="批阅设置"
          width="500"
      >
        <el-form :model="form" label-width="100px">
          <el-form-item label="模版">
            <el-select
                v-model="form.paperClassId"
                clearable
                placeholder="选择模版"
                style="width: 300px"
            >
              <el-option
                  v-for="item in modelOptions"
                  :key="item.paperClassId"
                  :label="item.modelName"
                  :value="item.paperClassId"
              >
                <span style="float: left">{{ item.modelName }}</span>
                <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">模版ID：{{
                    item.paperClassId
                  }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancelSet">
              取消
            </el-button>
            <el-button type="primary" @click="addSetAndModel()">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog
          v-model="centerDialogVisible1"
          align-center
          title="新增测试"
          width="500"
      >
        <el-form :model="form1" label-position="left" label-width="100px">
          <el-form-item label="课程">
            <el-select
                v-model="form1.lessonId"
                clearable
                placeholder="选择课程"
                style="width: 300px"
            >
              <el-option
                  v-for="item in options"
                  :key="item.lessonId"
                  :label="item.lessonName"
                  :value="item.lessonId"
              >
                <span style="float: left">{{ item.lessonName }}</span>
                <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">{{
                    item.lessonId
                  }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试名称">
            <el-input v-model="form1.examName" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="考试日期">
            <el-date-picker
                v-model="form1.examData"
                format="YYYY/MM/DD"
                placeholder="Pick a Date"
                style="width: 300px"
                type="date"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">
              取消
            </el-button>
            <el-button type="primary" @click="add()">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>


    </el-card>
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {ElMessage} from "element-plus";
import type {TableColumnCtx} from 'element-plus'
import {queryAllByTeacherId} from "@/request/class/class";
import {addExam, queryAllByIdForModel, queryByExamClass, queryByExamName,insertTestModelDto,deleteTest} from "@/request/test/test"
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
}

interface ExamInfo {
  examId: string,
  lessonId: string,
  examName: string,
  examClass: string,
  examSet: string,
  paperClassId: string,
  examData: string,
}

interface LessonDto {
  id: string
  lessonId: string
  lessonName: string
  hours: string
  score: string
  teacherId: string
  teacherName: string
}

interface LessonDtoInfo {
  lessonId: string
  lessonName: string
}

interface SpanMethodProps {
  row: Exam
  column: TableColumnCtx<Exam>
  rowIndex: number
  columnIndex: number
}

interface Model{
  id:number,
  modelName: string,
  modelClass: string,
  paperClassId: string,
  modelNumber: string,
}

interface ModelInfo{
  modelName: string,
  paperClassId: string,
}

interface modelToSet{
  id:number,
  teacherId:string,
  paperClassId:string,
}

const centerDialogVisible1 = ref(false)
const centerDialogVisible = ref(false)
const tableData = ref<Exam[]>([]);
const lessonList = ref<LessonDto[]>([]);
const options = ref<LessonDtoInfo[]>([]);
const modelOptions=ref<ModelInfo[]>([]);
const modelList=ref<Model[]>([]);
const input = ref('');
const form=ref<modelToSet>({
  id:-1,
  teacherId:localStorage.getItem('id'),
  paperClassId:'',
});
const form1 = ref<ExamInfo>({
  examId: '',
  lessonId: '',
  examName: '',
  examClass: '1',
  examSet: '',
  paperClassId: '',
  examData: '',
});

const toAnswer=(data:Exam)=>{
  localStorage.setItem('examLessonId',data.lessonId)
  localStorage.setItem('examId',data.examId)
  localStorage.setItem('examName',data.examName)
  localStorage.setItem('examData',data.examData)
  localStorage.setItem('modelName',data.modelName)
  router.push("answer")
}

const deleteById=async (id:number)=>{
  const res=await deleteTest(id);
  if(res.data.data){
    ElMessage.success("删除成功");
  }else {
    ElMessage.error("删除失败");
  }
  await getTest();
}

const addSetAndModel=async ()=>{
  const res=await insertTestModelDto(form.value);
  if(res.data.data){
    ElMessage.success("设置成功");
    await getTest();
    centerDialogVisible.value=false;
    form.value.id=-1;
  }else {
    ElMessage.error("设置失败");
    centerDialogVisible.value=false;
    form.value.id=-1;
  }
}

const addTeacherToClass=(data:Exam)=>{
  form.value.id=data.id;
  centerDialogVisible.value=true;
}
const cancelSet=()=>{
  centerDialogVisible.value=false;
  form.value.id=-1;
}
const selectTest = async () => {
  if (input.value == null || input.value.length == 0) {
    await getTest();
  } else {
    const res = await queryByExamName(input.value);
    console.log(res.data.data)
    if (res.data.data===null) {
      ElMessage.error("考试不存在")
    } else {
      ElMessage.success("查询成功");
      tableData.value = res.data.data
    }
    input.value = '';
  }
}
const addTest = () => {
  centerDialogVisible1.value = true;
}
const add = async () => {
  if (form1.value.lessonId===''||form1.value.examName===''||form1.value.examData===''){
    ElMessage.error("请填写相关信息")
  }else {
    console.log(form1.value)
    const res = await addExam(form1.value);
    if (res.data) {
      ElMessage.success("记得进行批阅设置");
      await getTest();
      centerDialogVisible1.value = false;
    } else {
      ElMessage.error("添加失败")
    }
    form1.value.lessonId='';
    form1.value.examName='';
    form1.value.examData='';
  }
}

const objectSpanMethod = ({
                            row,
                            column,
                            rowIndex,
                            columnIndex,
                          }: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}
// 模拟后端返回的数据
const getLesson = () => {
  queryAllByTeacherId(localStorage.getItem('id')).then((res) => {
        lessonList.value = res.data.data;
        for (let i = 0; i < lessonList.value.length; i++) {
          options.value.push({lessonId: lessonList.value[i].lessonId, lessonName: lessonList.value[i].lessonName})
        }
      }
  ).catch((error) => {
    console.error("出现错误", error);
  })
};
const getTest = () => {
  queryByExamClass("1").then((res) => {
    tableData.value = res.data.data;
  }).catch((error) => {
    console.error("出现错误", error);
  })
}
const getTestModel=()=>{
  queryAllByIdForModel("1").then((res) => {
    modelList.value=res.data.data;
    for (let i = 0; i < modelList.value.length; i++) {
      modelOptions.value.push({modelName: modelList.value[i].modelName, paperClassId: modelList.value[i].paperClassId})
    }
  }).catch((error) => {
    console.error("出现错误", error);
  })
}
onMounted(async () => {
  await getLesson();
  await getTest();
  await getTestModel();
});
</script>

<style scoped>
</style>
