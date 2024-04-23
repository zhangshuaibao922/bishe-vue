<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <el-card shadow="never" style="margin-left: 100px; width: 900px; height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;">
      <img :src="url" @click="previewImg(url)" style="
      max-width: 100%;
      max-height: 700px;">
    </el-card>
    <el-card shadow="never" style="margin-left: 10px;height: 90%;width: 400px">
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
        <el-button v-if="shunXu>=1" size="large" style="margin-left: 70px;margin-top: 50px" type="primary" @click="toGoBack" round>上一份</el-button>
        <el-button size="large" style="margin-left: 70px;margin-top: 50px"type="primary"  round>批  注</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { queryByExamIdAndTeacherId, edit, editSetting } from '@/request/score/score';
import { ElMessage } from 'element-plus';
import router from '@/router';

export default {
  data() {
    return {
      formData: [],
      count: null,
      num: 0,
      shunXu: 0,
      url: '',
      buttons: [],
      data: {
        paperId: '',
        answerId: '',
        num: parseInt(localStorage.getItem('num')),
        answerScore: this.num,
        teacherId: '',
      },
    };
  },
  methods: {
    previewImg(url) {
      this.$hevueImgPreview(url)
    },
    toGoBack() {
      this.shunXu--;
      this.url = this.formData[this.shunXu].answerUrl;
    },
    async toScore(answerScore) {
      this.data.paperId = this.formData[this.shunXu].paperId;
      this.data.answerId = this.formData[this.shunXu].answerId;
      this.data.teacherId = localStorage.getItem('id');
      this.data.answerScore = answerScore;
      const res = await edit(this.data);
      if (res.data.data) {
        ElMessage.success('批改完成');
      }
      if (this.shunXu + 1 === this.formData.length) {
        this.shunXu = 0;
        this.buttons = [];
        await this.getDate();
      } else if (this.shunXu + 1 < this.formData.length) {
        this.shunXu++;
        this.url = this.formData[this.shunXu].answerUrl;
      }
    },
    handleChange() {
      console.log(this.num);
    },
    getDate() {
      queryByExamIdAndTeacherId(localStorage.getItem('examId'), localStorage.getItem('answerId'),localStorage.getItem('teacherId'))
          .then((res) => {
            this.formData = res.data.data;
            if (res.data.code===200) {
              if(res.data.data.length>0){
                ElMessage.success('查询成功');
                this.url = this.formData[this.shunXu].answerUrl;
              }
            } else if (res.data.code === 250) {
              ElMessage.success('已经批改完成');
              router.push('setScore');
            }
            this.count = parseInt(localStorage.getItem('count'));
            for (let i = 0; i <= this.count; i++) {
              if (this.count <= 20) {
                if (i === 0) {
                  this.buttons.push({
                    text: String(i),
                    type: 'warning',
                    score: i,
                  });
                } else {
                  this.buttons.push({
                    text: String(i),
                    type: '',
                    score: i,
                  });
                }
              } else {
                if (i === 0) {
                  this.buttons.push({
                    text: String(i),
                    type: 'warning',
                    score: i,
                  });
                } else if (i % 5 === 0) {
                  this.buttons.push({
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
    },
  },
  async mounted() {
    await this.getDate();
  },
};

</script>

<style scoped>

</style>
