import { defineStore } from 'pinia';
import { ref } from 'vue';

interface StudentScoreDto {
  studentId: string;
  studentName: string;
  examId: string;
  totalScore: number;
}
interface User {
  name: string,
  username: string,
  oldPassword: string,
  newPassword: string,
  description: string,
  authorityRole: string,
  identity: string,
}
export const useStudentStore = defineStore({
  id: 'student',
  state: () => ({
    studentScoreList: [] as StudentScoreDto[],
    studentInfo:{} as StudentScoreDto,
    userInfo:{} as User,
  }),
  actions: {
    setStudentScoreList(studentScoreList: StudentScoreDto[]) {
      this.studentScoreList = studentScoreList;
    },
    setStudentInfo(studentInfo: StudentScoreDto) {
      this.studentInfo = studentInfo;
    },
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo;
    }
  }
});
