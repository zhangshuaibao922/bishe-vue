import { defineStore } from 'pinia';
import { ref } from 'vue';

interface StudentScoreDto {
  studentId: string;
  studentName: string;
  examId: string;
  totalScore: number;
}

export const useStudentStore = defineStore({
  id: 'student',
  state: () => ({
    studentScoreList: [] as StudentScoreDto[],
    studentInfo:{} as StudentScoreDto,
  }),
  actions: {
    setStudentScoreList(studentScoreList: StudentScoreDto[]) {
      this.studentScoreList = studentScoreList;
    },
    setStudentInfo(studentInfo: StudentScoreDto) {
      this.studentInfo = studentInfo;
    }
  }
});
