<template>
  <div style="width: 100%;height: 100%;">
    <!-- 居中的输入框和按钮 -->
    <el-input v-if="showForm" v-model="input" style="width: 240px;margin-top: 15%;margin-left: 30%"
              placeholder="请输入课号" size="large"/>
    <el-button v-if="showForm" type="primary" @click="fetchList" size="large" style="margin-top: 15%;margin-left: 10px">查询学生
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const input = ref('')

interface ListItem {
  id: number;
  name: string;
}

const showForm = ref(true);
const query = ref('');
const list = ref<ListItem[]>([]);

const fetchList = () => {
  // 模拟异步请求数据
  setTimeout(() => {
    // 假设这是从后端获取的数据
    const data: ListItem[] = [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
      {id: 3, name: 'Item 3'}
    ];
    list.value = data;
    // 隐藏输入框和按钮，展示列表
    showForm.value = false;
  }, 1000);
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
