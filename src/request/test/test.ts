import service from "@/request/index";

interface ExamInfo {
    examId: string,
    lessonId: string,
    examName: string,
    examClass: string,
    examSet: string,
    paperClassId: string,
    examData: string,
}
interface modelToSet{
    id:number,
    teacherId:string,
    paperClassId:string,
}
interface ModelToSetExam {
    id:number,
    teacherId: string,
    paperClassId: string,
    data: any[][],
}

export function addExam(data:ExamInfo){
    return service({
        url:'/exam',
        method:'post',
        data,
    })
}

export function queryByExamClass(examClass:string,teacherId:string){
    return service({
        url:'/exam/all/'+examClass+"/"+teacherId,
        method:'get',
    })
}
export function scoreQueryByExamClass(examClass:string){
    return service({
        url:'/exam/all/score/'+examClass,
        method:'get',
    })
}

export function queryByExamName(examName:string){
    return service({
        url:'/exam/'+examName,
        method:'get',
    })
}

export function queryAllByIdForModel(modelClass:string){
    return service({
        url:'/model/all/'+modelClass,
        method:'get',
    })
}

export function deleteTest(id:number){
    return service({
        url:'/model/'+id,
        method:'delete',
    })
}

export function insertTestModelDto(data:modelToSet){
    return service({
        url:'/model/test',
        method:'post',
        data,
    })
}
export function insertExamModelDto(data:ModelToSetExam){
    return service({
        url:'/model/exam',
        method:'post',
        data,
    })
}


export function queryTeacher(){
    return service({
        url:'/teacher/all',
        method:'get',
    })
}
