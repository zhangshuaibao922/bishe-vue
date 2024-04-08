import service from "@/request/index";

interface Lesson {
    id: string
    lessonId: string
    lessonName: string
    hours: string
    score: string
}
interface LessonInfo {
    lessonId: string
    lessonName: string
    hours: string
    score: string
}
export function queryAll(){
    return service({
        url:'/lesson/all',
        method:'get',
    })
}

export function queryById(id:string){
    return service({
        url:'/lesson/'+id,
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

export function addByInfo(data:LessonInfo){
    return service({
        url:'/lesson',
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
