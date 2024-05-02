import service from "@/request/index";

interface College {
    id: number,
    collegeId: string,
    collegeName: string,
}

interface Collegeinfo {
    collegeId: string,
    collegeName: string,
}

export function query(){
    return service({
        url:'/college/all',
        method:'get',
    })
}

export function queryTeachersByCollegeID(collegeId:string){
    return service({
        url:'/teacher/byCollegeId/'+collegeId,
        method:'get',
    })
}
export function queryStudentsByCollegeID(collegeId:string){
    return service({
        url:'/student/byCollegeId/'+collegeId,
        method:'get',
    })
}

export function queryLessonsByCollegeID(collegeId:string){
    return service({
        url:'/lesson/byCollegeId/'+collegeId,
        method:'get',
    })
}
export function queryById(data: College){
    return service({
        url:'/college',
        method:'put',
        data
    })
}

export function deleteByid(Id:number){
    return service({
        url:'/college/'+Id,
        method:'delete',
    })
}

export function addByInfo(data:Collegeinfo){
    return service({
        url:'/college',
        method:'post',
        data,
    })
}
