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
interface TeacherInfo {
    collegeId: string
    teacherId: string
    teacherName: string
    teacherPassword: string
    idCardNo: string
    teacherEmail: string
    code: string
    authorityId: string
    status: string
    description: string
}

interface StudentInfo {
    collegeId: string
    studentId: string
    studentPassword: string
    studentName: string
    idCardNo: string
    studentEmail: string
    code: string
    gender: string
    status: string
    authorityId: string
    description: string
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

export function createStudent(data: StudentInfo){
    return service({
        url:'/student',
        method:'post',
        data
    })
}


export function createTeacher(data: TeacherInfo){
    return service({
        url:'/teacher',
        method:'post',
        data
    })
}

export function verificationCode(email: string){
    return service({
        url:'/login/verificationCode/'+email,
        method:'get',
    })
}

