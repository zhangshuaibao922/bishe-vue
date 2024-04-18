import service from "@/request/index";


export function upload(examId:string,data){
    return service({
        url:'/aliyun/upload/'+examId,
        method:'post',
        headers: {
            'Content-Type': 'multipart/form-data' // 设置正确的 Content-Type
        },
        data,

    })
}
