import axios from 'axios'

//创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:39999/',
    headers: {'Content-Type': 'application/json;charset=utf-8'}
});

export default service
