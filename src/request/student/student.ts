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

export function queryByStudentId(studentId:string){
    return service({
        url:'/student/'+studentId,
        method:'get',
    })
}

export function update(data:Lesson){
    return service({
        url:'/lesson',
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


export function deleteById(id:string){
    return service({
        url:'/lesson/'+id,
        method:'delete',
    })
}
