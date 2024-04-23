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
