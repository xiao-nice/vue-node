import { defineStore } from 'pinia';
import { loginApi } from '@/api/login';
import router from '@/router';
import { PageEnum } from '@/enums/pageEnum';
import { getStorage, setStorage } from '@/utils/storage';
import { getUserInfoApi } from '@/api/user';

interface UserState {
  userInfo: Partial<API.UserInfo>;
  token: string;
}

export const useUserStroe = defineStore({
  id: 'userStore',
  state: (): UserState => ({
    userInfo: {},
    token: getStorage('TOKEN') || ''
  }),
  getters: {
    getToken(): UserState['token'] {
      return this.token || getStorage('TOKEN') || ''
    }
  },
  actions: {
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    },
    setToken(token: UserState['token']) {
      this.token = token
      setStorage('TOKEN', token)
    },
    async getUserInfoAction(): Promise<any> {
      const res = await getUserInfoApi()
      if (res) {
        this.setUserInfo(res)
      }
    },
    async loginAction(params: API.User): Promise<any> {
      const res = await loginApi(params)
      if (res?.token) {
        this.setUserInfo(res)
        this.setToken(res.token)
        router.push(PageEnum.BASE_HOME)
      } else {
        this.userInfo = {}
      }
    }
  }
})