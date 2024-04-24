import service from "@/request/index";


export function upload(lessonId:string,examId:string,data){
    return service({
        url:'/aliyun/upload/'+lessonId+"/"+examId,
        method:'post',
        headers: {
            'Content-Type': 'multipart/form-data' // 设置正确的 Content-Type
        },
        data,

    })
}

export function update(objectName:string,data){
    return service({
        url:'/aliyun/update?objectName='+objectName,
        method:'post',
        headers: {
            'Content-Type': 'multipart/form-data' // 设置正确的 Content-Type
        },
        data,

    })
}
