import axios from 'axios'
import router from "../router";
export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.249.8.193:8080/api',
    baseURL: 'http://127.0.0.1:8080/api',
    timeout: 10000
  })
  // 请求拦截器配置
  instance.interceptors.request.use(config => {
      // config.headers.Authorization = window.sessionStorage.getItem('token')
      // config.headers.
      return config
    }, error => {
      console.log(error)
      return Promise.error(error)
    }
  )
  // 响应拦截器配置
  instance.interceptors.response.use(response => {
    console.log(response)
    return response
  }, error => {
    // switch (error.response.status) {
    //   case 401:
    //     console.log("无权访问")
    //     router.push({path: '/login'})
    //     break
    //   case 403:
    //     console.log("token过期啦")
    //     router.push({path: '/login'})
    //     break
    //   case 404:
    //     console.log("404啦")
    //     router.push({path: '/404'})
    //     break
    //   default:
    //     return Promise.reject(error)
    // }
    // return Promise.reject(error)
  })
  // 发送真正的网络请求
  return instance(config);
}
export default request