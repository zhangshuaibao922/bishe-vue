<template>
  <div style="width: 100%;height: 100%;">
<!--    <el-card style="margin-left: 100px;margin-right: 100px;height: 10%"  shadow="hover">-->
<!--      <el-input v-model="input" style="width: 500px;margin-left: 20%"-->
<!--                placeholder="请输入课程名称" size="large"/>-->
<!--      <el-button type="primary" @click="selectLesson" size="large" style="">查询课程-->
<!--      </el-button>-->

<!--      <el-button type="success" round @click="addLesson" size="large" style="margin-left: 100px">新增课程-->
<!--      </el-button>-->
<!--    </el-card>-->
    <el-card style="margin-left: 100px;margin-right: 100px;height: 90%;"  shadow="never" height="900px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="课程号" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Collection /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.lessonId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="200">
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
        <el-table-column label="任课教师" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><UserFilled /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.teacherName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.teacherId===''" size="small" @click="showTeacher(scope.row.lessonId)" type="success">
              添加教师
            </el-button>
            <el-button size="small" type="success" @click="selectStudent(scope.row.lessonId)">
              查看学生
            </el-button>
<!--            <el-button size="small" @click="updateLesson(scope.row)">-->
<!--              修改-->
<!--            </el-button>-->
<!--            <el-button-->
<!--                size="small"-->
<!--                type="danger"-->
<!--                @click="deleteLesson(scope.row.id)">-->
<!--              删除-->
<!--            </el-button>-->
          </template>
        </el-table-column>
      </el-table>

<!--      <el-dialog-->
<!--          v-model="centerDialogVisible"-->
<!--          title="修改课程"-->
<!--          width="500"-->
<!--          align-center-->
<!--      >-->
<!--        <el-form :model="form" label-width="100px">-->
<!--          <el-form-item label="课程ID">-->
<!--            <el-input v-model="form.lessonId"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="课程名称">-->
<!--            <el-input v-model="form.lessonName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="学分">-->
<!--            <el-input v-model="form.score"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="学时">-->
<!--            <el-input v-model="form.hours"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <template #footer>-->
<!--          <div class="dialog-footer">-->
<!--            <el-button @click="centerDialogVisible = false">-->
<!--              取消-->
<!--            </el-button>-->
<!--            <el-button type="primary" @click="change(form)">-->
<!--              确定-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-dialog>-->
<!--      <el-dialog-->
<!--          v-model="centerDialogVisible1"-->
<!--          title="新增课程"-->
<!--          width="500"-->
<!--          align-center-->
<!--      >-->
<!--        <el-form :model="form1" label-width="100px">-->
<!--          <el-form-item label="课程ID">-->
<!--            <el-input v-model="form1.lessonId"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="课程名称">-->
<!--            <el-input v-model="form1.lessonName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="学分">-->
<!--            <el-input v-model="form1.score"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="学时">-->
<!--            <el-input v-model="form1.hours"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <template #footer>-->
<!--          <div class="dialog-footer">-->
<!--            <el-button @click="centerDialogVisible1 = false">-->
<!--              取消-->
<!--            </el-button>-->
<!--            <el-button type="primary" @click="add(form1)">-->
<!--              确定-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-dialog>-->


<!--      <el-dialog-->
<!--          v-model="centerDialogVisible2"-->
<!--          title="添加教师"-->
<!--          width="500"-->
<!--          align-center-->
<!--      >-->
<!--        <div style="display: flex; justify-content: space-between; align-items: center;">-->
<!--          <el-form>-->
<!--            <el-form-item label="教师ID">-->
<!--              <el-input v-model="teacherInput" style="width: 300px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <el-button type="primary" style="margin-bottom: 20px" @click="selectTeacher(teacherInput)">-->
<!--            搜索-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <el-table :data=teacher style="width: 100%">-->
<!--          <el-table-column label="教师ID" width="160">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <el-icon><UserFilled /></el-icon>-->
<!--                <span style="margin-left: 10px">{{ scope.row.teacherId}}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="姓名" width="160">-->
<!--            <template #default="scope">-->
<!--              <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
<!--                <template #default>-->
<!--                  <div>个人简介: {{scope.row.description}}</div>-->
<!--                </template>-->
<!--                <template #reference>-->
<!--                  <el-tag>{{ scope.row.teacherName }}</el-tag>-->
<!--                </template>-->
<!--              </el-popover>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作">-->
<!--            <template #default="scope">-->
<!--              <el-button-->
<!--                  size="small"-->
<!--                  type="success"-->
<!--                  @click="addTeacherToClass(scope.row.teacherId)"-->
<!--              >添加-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-dialog>-->


    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import { Collection,UserFilled } from '@element-plus/icons-vue'
import {queryAll,queryAllByTeacherId, update,addByInfo,deleteById,addByTeacherId,queryById,queryByTeacherId} from "@/request/class/class";
import {ElMessage} from "element-plus";
import router from "@/router";

interface Lesson {
  id: string
  lessonId: string
  lessonName: string
  hours: string
  score: string
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
const centerDialogVisible2 = ref(false)
const input = ref<string>('')
const teacherInput=ref<string>('')
const teacher=ref<Teacher[]>([]);
const selectStudent=(lessonId:string)=>{
  localStorage.setItem('lessonId', lessonId)
  router.push("student")
}
const showTeacher=(lessonId:string)=>{
  localStorage.setItem('lessonId', lessonId)
  centerDialogVisible2.value=true;
}
const selectTeacher=async (teacherId:string)=>{
  const res= await queryByTeacherId(teacherId);
  console.log(res.data);
  if (res.data.length == 0) {
    ElMessage.error("教师不存在");
  } else {
    ElMessage.success("请选择教师");
    teacher.value = res.data
  }
}
const addTeacherToClass=async (teacherId:string)=>{
  const res=await addByTeacherId({
    lessonId: localStorage.getItem('lessonId'),
    teacherId:teacherId,
  })
  if(res.data){
    ElMessage.success("添加成功");
    teacherInput.value='';
    await fetchData();
  }else {
    ElMessage.error("添加失败");
    teacherInput.value='';
  }
}
const selectLesson=async ()=>{
  if(input.value==null||input.value.length==0){
    await fetchData();
  }else {
    const res=await queryById(input.value);
    if(res.data.length==0) {
      ElMessage.error("课程不存在")
    }else {
      ElMessage.success("查询成功");
      tableData.value = res.data
      console.log(res.data)
    }
    input.value='';
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
const tableData= ref<LessonDto[]>([]);
// 模拟后端返回的数据
const fetchData = () => {
  queryAllByTeacherId(localStorage.getItem('id')).then((res) => {
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
