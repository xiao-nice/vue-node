import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { HttpStatus, HttpStatusType } from './http'
import { ElMessage } from 'element-plus';
import store from '@/store/index';
import { useUserStroe } from '@/store/modules/user';
console.log('store', store);

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { getToken } = useUserStroe()
  config.headers['token'] = getToken
  return config
})

instance.interceptors.response.use((res: AxiosResponse<any>) => {
  const { status, data } = res
  if (status === 200) {
    const { code, data: response, msg } = data
    if (code === 0) {
      return response
    } else {
      ElMessage.error(msg)
      return Promise.reject(data)
    }
  }
  return res
}, (error: AxiosError) => {
  const { status } = error.response || {}
  if (status && status !== 200) {
    const msg = `errMsg${status}` as HttpStatusType
    ElMessage.error(HttpStatus[msg])
  }
})

export default instance

