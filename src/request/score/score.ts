import service from "@/request/index";


interface Score {
    paperId: string,
    answerId: string,
    num: number,
    answerScore: number,
    teacherId: string,
}
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
    isDelete: number,
}
interface Setting {
    id: number,
    num: number,
    examSet: string,
    answerId: string,
    teacherId: string,
    count: number,
    allScore: number,
}
interface StudentScoreDto{
    studentId:string,
    studentName:string,
    examId:string,
    totalScore:number,
}


export function queryByTeacherIdAndExamSet(teacherId:string,examId:string){
    return service({
        url:'/setting/'+teacherId+"/"+examId,
        method:'get',
    })
}


export function queryByExamIdAndTeacherId(examId:string,answerId:string,teacherId:string){
    return service({
        url:'/answer/'+examId+"/"+answerId+"/"+teacherId,
        method:'get',
    })
}

export function querySeeScore(examClass:string,teacherId:string){
    return service({
        url:'/exam/all/'+examClass+"/"+teacherId+"/2",
        method:'get',
    })
}
export function edit(data:Score){
    return service({
        url:'/score',
        method:'put',
        data,
    })
}
export function editSetting(data:Setting){
    return service({
        url:'/setting',
        method:'put',
        data,
    })
}

export function updateExam(data:Exam){
    return service({
        url:'/exam',
        method:'put',
        data,
    })
}

export function queryDesById(examSet:string,answerId:string){
    return service({
        url:'/setting/desById/'+examSet+"/"+answerId,
        method:'get',
    })
}

export function queryAllScore(examId:string,lessonId:string,studentId:string){
    return service({
        url:'/score/getScore/'+examId+"/"+lessonId+"/"+studentId,
        method:'get',
    })
}

export function getStudentScore(data:StudentScoreDto){
    return service({
        url:'/answer/getStudentScore',
        method:'put',
        data,
    })
}
