<template>
  <div style="width: 94%;height: 100%;margin: 1%">
    <div>
      <el-row :gutter="20" v-loading="loading">
        <el-col :span="8" v-for="(item, index) in collegeList" :key="index"
                style="margin-top: 10px; margin-bottom: 10px;">
          <el-card class="card-item" :body-style="{ padding: '20px' }">
            <template #header>
              <div style="display: flex; justify-content: flex-end; align-items: center;">
                <el-button type="primary" v-show="item.id!==-1" @click="showDialog(item)">修改</el-button>
                <el-button type="danger" v-show="item.id!==-1" @click="deletebyId(item.id)">删除</el-button>
                <div v-if="item.id===-1" style="height: 32px;width: 10px"></div>
              </div>
            </template>
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%">
              <div v-if="item.id!==-1" style="width: 50px; height: 50px; background: white"></div>
              <div v-if="item.id===-1"
                   style="width: 100%; height: 50px; background: whitesmoke;display: flex; justify-content: center; align-items: center;" @click="addCollege">
                <span style="margin-left: 10px;font-size: 20px;font-weight: bold;color: black">新增学院</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="text-align: right;">
                  <span>{{ item.collegeId }}</span>
                  <p>{{ item.collegeName }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog
          v-model="centerDialogVisible"
          title="修改学院"
          width="500"
          align-center
      >
        <el-form :model="form" label-width="100px">
          <el-form-item label="学院ID">
            <el-input v-model="form.collegeId"></el-input>
          </el-form-item>
          <el-form-item label="学院名称">
            <el-input v-model="form.collegeName"></el-input>
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
          title="新增学院"
          width="500"
          align-center
      >
        <el-form :model="form1" label-width="100px">
          <el-form-item label="学院ID">
            <el-input v-model="form1.collegeId"></el-input>
          </el-form-item>
          <el-form-item label="学院名称">
            <el-input v-model="form1.collegeName"></el-input>
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
import {query, queryById, addByInfo, deleteByid} from "@/request/school/query";
import {ElMessage} from "element-plus";

interface College {
  id: number,
  collegeId: string,
  collegeName: string,
}

interface Collegeinfo {
  collegeId: string,
  collegeName: string,
}

const collegeList = ref<College[]>([]);
const centerDialogVisible = ref(false)
const centerDialogVisible1 = ref(false)
const loading = ref(true)
const form = ref<College>({
  id: -1,
  collegeId: '',
  collegeName: '',
});
const form1 = ref<Collegeinfo>({
  collegeId: '',
  collegeName: '',
});
const showDialog = (data: College) => {
  centerDialogVisible.value = true;
  form.value.id = data.id;
  form.value.collegeId = data.collegeId;
  form.value.collegeName = data.collegeName;
};

const addCollege = () => {
  centerDialogVisible1.value = true;
  console.log(form1)
}

const deletebyId = async (id: number) => {
  console.log(id)
  const res =await deleteByid(id);
  console.log(res.data);
  if (res.data) {
    ElMessage.success("删除成功");
    await fetchData();
  } else {
    ElMessage.error("删除失败");
  }
}

const resetForm = () => {
  ElMessage.info("取消修改");
};

// 模拟后端返回的数据
const fetchData = () => {
  query().then((res) => {
        console.log(res.data.data)
        collegeList.value = res.data.data;
        collegeList.value.push({
          id: -1,
          collegeId: '',
          collegeName: '',
        })
      }
  ).catch((error) => {
    console.error("出现错误", error);
  })
  loading.value=false;
};

const change = async (college: College) => {
  // 在这里执行修改操作，你可以访问传递的 collegeId 参数
  console.log('修改的学院', college.collegeName);
  const res = await queryById(college);
  console.log(res.data);
  if (res.data) {
    ElMessage.success("修改成功");
    centerDialogVisible.value = false;
    await fetchData();
  } else {
    ElMessage.error("修改失败");
    centerDialogVisible.value = false;
  }
};
const add = async (data: Collegeinfo) => {
  console.log(data)
  const res = await addByInfo(data);
  console.log(res.data);
  if (res.data) {
    ElMessage.success("新增成功");
    centerDialogVisible1.value = false;
    form1.value.collegeId='';
    form1.value.collegeName='';
    await fetchData();
  } else {
    ElMessage.error("新增失败");
    centerDialogVisible1.value = false;
  }
}
onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
</style>
