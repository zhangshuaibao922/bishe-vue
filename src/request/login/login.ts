import service from "@/request/index";
interface loginData {
    identity: string,
    username: string,
    password: string
}

export function login(data:loginData){
    return service({
        url:'/login/login',
        method:'post',
        data
    })
}
