import service from "@/request/index";

export function queryByIdExam(lessonId:string,examId:string){
    return service({
        url:'/paper/exam/'+lessonId+"/"+examId,
        method:'get',
    })
}
