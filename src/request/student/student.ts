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
interface StudentInfo {
    collegeId: string
    studentId: string
    studentPassword: string
    studentName: string
    idCardNo: string
    mobilePhone: string
    gender: string
    status: string
    authorityId: string
    description: string
}
interface Student {
    id: number
    collegeId: string
    studentId: string
    studentPassword: string
    studentName: string
    idCardNo: string
    mobilePhone: string
    gender: string
    status: string
    authorityId: string
    description: string
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

export function getInfo(studentId:string){
    return service({
        url:'/student/getInfo/'+studentId,
        method:'get',
    })
}

export function getPaperClassId(examId:string){
    return service({
        url:'/exam/getModelClass/'+examId,
        method:'get',
    })
}

export function getAll(){
    return service({
        url:'/student/getAll',
        method:'get',
    })
}

export function add(data: StudentInfo){
    return service({
        url:'/student',
        method:'post',
        data,
    })
}
export function deleteByIdStudent(id:string){
    return service({
        url:'/student/deleteStudentId/'+id,
        method:'delete',
    })
}
export function updateStudent(data:Student){
    return service({
        url:'/student',
        method:'put',
        data,
    })
}
export function selectLike(studentId:string){
    return service({
        url:'/student/getLike/'+studentId,
        method:'get',
    })
}
