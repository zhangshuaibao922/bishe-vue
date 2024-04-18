import service from "@/request/index";

interface Lesson {
    id: string
    lessonId: string
    lessonName: string
    hours: string
    score: string
}
interface ChooseInfo {
    lessonId: string
    studentId: string
}
export function queryAll(lessonId:string){
    return service({
        url:'/choose/all/'+lessonId,
        method:'get',
    })
}

export function queryById(id:string){
    return service({
        url:'/choose/'+id,
        method:'get',
    })
}

export function queryByStudentId(data:ChooseInfo){
    return service({
        url:'/student/select',
        method:'put',
        data,
    })
}


export function addByInfo(data:ChooseInfo){
    return service({
        url:'/choose',
        method:'post',
        data,
    })
}


export function deleteById(studentId:string){
    return service({
        url:'/choose/'+studentId,
        method:'delete',
    })
}
