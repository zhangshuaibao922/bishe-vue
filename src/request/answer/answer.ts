import service from "@/request/index";

export function queryByIdExam(lessonId:string,examId:string){
    return service({
        url:'/paper/exam/'+lessonId+"/"+examId,
        method:'get',
    })
}


export function cutting(paperClassId:string,examId:string){
    return service({
        url:'/cut/'+paperClassId+"/"+examId,
        method:'get',
    })
}
