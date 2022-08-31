import axios from 'axios'

// 使用create方法创建axios实例
const Axios = axios.create({
  timeout: 60000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})
// 添加请求拦截器
Axios.interceptors.request.use((config) => {
  // console.log(config)
  return config
})
// 添加响应拦截器
Axios.interceptors.response.use((response) => {
  if (response?.headers?.['set-cookie']) {
    if (typeof response.data === 'object') {
      response.data.setCookie = response.headers['set-cookie']
    }
    else {
      return {
        qRes_: response.data,
        setCookie: response.headers['set-cookie'],
      }
    }
  }
  return response.data// 这里只返回服务器给的数据到回调函数，
}, (error) => {
  // const msg = error.Message !== undefined ? error.Message : ''
  // alert(msg)
  return Promise.reject(error)
})

export default Axios
