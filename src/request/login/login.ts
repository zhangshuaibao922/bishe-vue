import service from "@/request/index";
interface loginData {
    identity: string,
    username: string,
    password: string
}
interface User {
    name: string,
    username: string,
    oldPassword: string,
    newPassword: string,
    description: string,
    authorityRole: string,
    identity: string,
}
export function login(data:loginData){
    return service({
        url:'/login/login',
        method:'post',
        data
    })
}

export function updatePassword(data:User){
    return service({
        url:'/login/updatepassword',
        method:'post',
        data
    })
}
