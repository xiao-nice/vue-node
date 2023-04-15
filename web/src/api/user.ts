import request from '@/utils/request';

export const getUserInfoApi = (): Promise<any> => {
  return request.get('/user/info')
}