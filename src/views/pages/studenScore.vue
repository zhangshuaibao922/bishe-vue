<template>
  <div style="width: 100%;height: 100%;display: flex">
    <el-card v-if="tableData.length!==1" style="height: 100%;width: 50%">
      <div ref="chartRef" style="width: 700px; height: 700px"></div>
    </el-card>
    <el-card shadow="never" style="width: 50%;height: 90%;">
      <el-button size="large" style="margin-bottom: 10px" type="primary" @click="doBack">返回列表
      </el-button>

      <el-button v-if="tableData.length!==1" size="large" style="margin-bottom: 10px;margin-left: 500px" type="success" @click="doExcel">下载成绩
      </el-button>
      <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          height="700px"
          style="width: 100%;"
      >
        <el-table-column label="学号">
          <template #default="scope">
            <el-text v-if="scope.row.totalScore!==0" size="large">{{ scope.row.studentId }}</el-text>
            <el-text v-else size="large" type="danger">{{ scope.row.studentId }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            <el-text v-if="scope.row.totalScore!==0" size="large">{{ scope.row.studentName }}</el-text>
            <el-text v-else size="large" type="danger">{{ scope.row.studentName }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="成绩">
          <template #default="scope">
            <el-text v-if="scope.row.totalScore!==0" size="large" type="primary">{{ scope.row.totalScore }}</el-text>
            <el-text v-else size="large" type="danger">{{ scope.row.totalScore }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: left;">
              <el-button v-if="scope.row.totalScore!==0"
                         size="small"
                         type="success"
                         @click="toSeeStudent(scope.row)"
              >查看每题成绩
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>

import {onMounted, reactive, ref} from 'vue';
import {useStudentStore} from '@/stores/counter'
import router from "@/router";
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

import {getPaperClassId} from "@/request/student/student";

const chartRef = ref(null);
const pieData = ref<model[]>([]);
const scoreRanges2 = [
  {name: "不及格", count: 0},
  {name: "良好", count: 0},
  {name: "优秀", count: 0},
];
const scoreRanges1 = [
  {name: "不及格", count: 0},
  {name: "良好", count: 0},
  {name: "优秀", count: 0},
];
const scoreRanges3 = [
  {name: "不及格", count: 0},
  {name: "及格", count: 0},
  {name: "良", count: 0},
  {name: "好", count: 0},
  {name: "优秀", count: 0},
];

interface model {
  name: string,
  value: number,
}

interface StudentScoreDto {
  studentId: string,
  studentName: string,
  examId: string,
  totalScore: number,
}
const doExcel=()=>{
  const prez = tableData.filter(row => row);
  const rows = prez.map(row => ({
    id:row.studentId,
    name: row.studentName,
    score: row.totalScore,
  }));
  console.log(rows)
  // 1. 创建一个工作簿 workbook
  const workBook = XLSX.utils.book_new()
  // 2. 创建工作表 worksheet
  const workSheet = XLSX.utils.json_to_sheet(rows)
  // 3. 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(workBook, workSheet)

  /* fix headers */
  XLSX.utils.sheet_add_aoa(workSheet, [["学号", "姓名","分数"]], { origin: "A1" });
  workSheet["!cols"] = [ { wch: 10 } ,{ wch: 10 } ];
  // 4. 生成数据保存
  XLSX.writeFile(workBook, "成绩.xlsx", { compression: true });
}
const studentStore = useStudentStore();
const tableData = studentStore.studentScoreList;
const mark = ref('')
const toSeeStudent = (data: StudentScoreDto) => {
  studentStore.setStudentInfo(data);
  resetData();
  router.push("oneStudent");
  console.log(data)
}

const resetData =()=>{
  // 将 pieData 重置为空数组
  pieData.value = [];

  // 将 scoreRanges1、scoreRanges2、scoreRanges3 重置为初始状态
  scoreRanges1.forEach(range => {
    range.count = 0;
  });

  scoreRanges2.forEach(range => {
    range.count = 0;
  });

  scoreRanges3.forEach(range => {
    range.count = 0;
  });
}

const doBack = () => {
  router.push("seeScore");
}
const tableRowClassName = ({row, rowIndex}) => {
  if (row.totalScore === 0) {
    return 'warning-row';
  } else {
    return 'success-row';
  }
};
// 模拟后端返回的数据
onMounted(async () => {
  const res = await getPaperClassId(localStorage.getItem("ScoreExamID"));
  mark.value = res.data.data
  if (mark.value === '1') {
    tableData.forEach((student) => {
      const score = student.totalScore;
      if (score >= 0 && score <= 59) {
        scoreRanges1[0].count++;
      } else if (score >= 60 && score <= 79) {
        scoreRanges1[1].count++;
      } else if (score >= 80 && score <= 100) {
        scoreRanges1[2].count++;
      }
    });
    for (let i = 0; i < 3; i++) {
      pieData.value.push({
        name:scoreRanges1[i].name,
        value:scoreRanges1[i].count,
      })
    }
  }
  if(mark.value === '2') {
    tableData.forEach((student) => {
      const score = student.totalScore;
      console.log(score)
      if (score >= 0 && score <= 11) {
        scoreRanges2[0].count++;
      } else if (score >= 12 && score <= 16) {
        scoreRanges2[1].count++;
      } else if (score >= 17 && score <= 20) {
        scoreRanges2[2].count++;
      }
    });
    console.log(scoreRanges2)
    for (let i = 0; i < 3; i++) {
      pieData.value.push({
        name:scoreRanges2[i].name,
        value:scoreRanges2[i].count,
      })
    }
  }
  if(mark.value==='3'){
    tableData.forEach((student) => {
      const score = student.totalScore;
      console.log(score)
      if (score >= 0 && score <= 59) {
        scoreRanges3[0].count++;
      } else if (score >= 60 && score <= 79) {
        scoreRanges3[1].count++;
      } else if (score >= 80 && score <= 99) {
        scoreRanges3[2].count++;
      } else if (score >= 100 && score <= 129) {
        scoreRanges3[3].count++;
      } else if (score >= 130 && score <= 150) {
        scoreRanges3[4].count++;
      }
    });
    console.log(scoreRanges3)
    for (let i = 0; i < 5; i++) {
      pieData.value.push({
        name:scoreRanges3[i].name,
        value:scoreRanges3[i].count,
      })
    }
  }

  console.log(pieData.value)
  const myChart = echarts.init(chartRef.value);
  const option = {
    color: ['#18F6F8', '#288CFC', '#FFD91A'],
    legend: {
      top: '10px',
      icon: 'circle',
      color: '#555',
      itemWidth: 10,
      itemHeight: 10
    },
    tooltip: {
      confine: true,
      trigger: 'item',
      formatter: '{b} : {c}'
    },
    series: [
      {
        avoidLabelOverlap: false,
        type: 'pie',
        roseType: 'area', // 玫瑰图
        center: ['50%', '50%'],
        radius: ['30%', '60%'],
        label: {
          formatter: '{b}\n-------------\n{d}%\t{c}',
          fontSize: 16
        },
        labelLine: {
          length: 10,
          length2: 30
        },
        data: pieData.value
      }
    ]
  };
  myChart.setOption(option);
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
