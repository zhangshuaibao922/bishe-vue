User
<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <el-card style="height: 100%;width: 300px">
      <el-card style="height: 100%;width: 250px">
        <div style="display: block;">
          <el-text size="large" type="primary">答案备注</el-text>
        </div>
        <el-text size="large" >{{settingInfo.description}}</el-text>
      </el-card>
    </el-card>
    <el-card shadow="never" style="width: 600px; height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;">
      <EditImage ref="childRef" class="childRef" style="width: 600px;height: 1000px"  :imagePath="url"></EditImage>
    </el-card>
    <el-card shadow="never" style="margin-left: 10px;height: 100%;width: 300px">
      <div style="height: 610px; overflow-y: auto;">
        <el-text size="large" type="primary">得分</el-text>
        <el-input-number
            v-model="num"
            style="margin-left: 20px;width: 200px"
            :min="0"
            :max="count"
            controls-position="right"
            @change="handleChange"
        />
        <div style="display: flex; flex-wrap: wrap;">
          <el-button style="flex: 0 0 calc(50% - 20px); margin: 10px;" v-for="(button, index) in buttons" :key="index" :type="button.type" @click="toScore(button.score)" >
            <span style="color: orangered;font-size: large">{{ button.text }}</span>
          </el-button>
        </div>
      </div>
      <div style="flex: 1;width: 100%;height: 90px">
        <el-button size="large" style="margin-top: 20px" type="primary" @click="changeSave" round>标记保存</el-button>
        <el-button v-if="shunXu>=1" size="large" style="margin-left: 50px;margin-top: 20px" type="primary" @click="toGoBack" round>上一份</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { queryByExamIdAndTeacherId, edit ,queryDesById} from '@/request/score/score';
import { ElMessage } from 'element-plus';
import router from '@/router';
import EditImage from "@/views/pages/image.vue";

export default {
  components: { EditImage: EditImage },
  setup() {
    const settingInfo=ref({
      examSet: localStorage.getItem("examSet"),
      answerId: localStorage.getItem('answerId'),
      description: '',
    });
    // 使用 ref 创建响应式数据
    const formData = ref([]);
    const count = ref(null);
    const num = ref(0);
    const shunXu = ref(0);
    const url = ref('');
    const buttons = ref([]);

    const data = ref({
      paperId: '',
      answerId: '',
      num: parseInt(localStorage.getItem('num')),
      answerScore: num.value,
      teacherId: '',
    });

    // 定义获取数据的方法
    const getDate = () => {
      queryByExamIdAndTeacherId(localStorage.getItem('examId'), localStorage.getItem('answerId'), localStorage.getItem('teacherId'))
          .then((res) => {
            formData.value = res.data.data;
            if (res.data.code === 200) {
              if (res.data.data.length > 0) {
                ElMessage.success('查询成功');
                url.value = formData.value[shunXu.value].answerUrl;
              }
            } else if (res.data.code === 250) {
              ElMessage.success('已经批改完成');
              router.push('setScore');
            }
            count.value = parseInt(localStorage.getItem('count'));
            for (let i = 0; i <= count.value; i++) {
              if (count.value <= 20) {
                if (i === 0) {
                  buttons.value.push({
                    text: String(i),
                    type: 'warning',
                    score: i,
                  });
                } else {
                  buttons.value.push({
                    text: String(i),
                    type: '',
                    score: i,
                  });
                }
              } else {
                if (i === 0) {
                  buttons.value.push({
                    text: String(i),
                    type: 'warning',
                    score: i,
                  });
                } else if (i % 5 === 0) {
                  buttons.value.push({
                    text: String(i),
                    type: '',
                    score: i,
                  });
                }
              }
            }
          })
          .catch((error) => {
            console.error('出现错误', error);
          });
    };

    // 调用获取数据的方法
    getDate();

    const getDes=async ()=>{
      const res=await queryDesById(settingInfo.value.examSet,settingInfo.value.answerId);
      settingInfo.value.description=res.data.data.description;
      console.log("备注")
      console.log(settingInfo.value.description)
    }
    getDes();
    // 定义其他方法
    const toGoBack = () => {
      shunXu.value--;
      url.value = formData.value[shunXu.value].answerUrl;
    };

    const toScore = async (answerScore) => {
      data.value.paperId = formData.value[shunXu.value].paperId;
      data.value.answerId = formData.value[shunXu.value].answerId;
      data.value.teacherId = localStorage.getItem('id');
      data.value.answerScore = answerScore;
      const res = await edit(data.value);
      if (res.data.data) {
        ElMessage.success('批改完成');
      }
      if (shunXu.value + 1 === formData.value.length) {
        shunXu.value = 0;
        buttons.value = [];
        await getDate();
      } else if (shunXu.value + 1 < formData.value.length) {
        shunXu.value++;
        url.value = formData.value[shunXu.value].answerUrl;
      }
    };

    const handleChange = async () => {
      await toScore(num.value);
    };

    const childRef=ref(null);
    const changeSave=()=>{
      const res=childRef.value.save();
      console.log(res)
      console.log("res")
    }

    return {
      settingInfo,
      formData,
      count,
      num,
      shunXu,
      url,
      buttons,
      childRef,
      toGoBack,
      toScore,
      handleChange,
      changeSave,
    };
  },
};
</script>


<style scoped>

</style>
