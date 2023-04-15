import request from '@/utils/request';

export const loginApi = <T = any>(data: T): Promise<any> => {
  return request.post('/system/login', data)
}