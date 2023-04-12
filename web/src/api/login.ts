import request from '@/utils/request';

export const loginApi =  <T>(data: T): Promise<any> => {
  return request.post('/system/login', data)
}