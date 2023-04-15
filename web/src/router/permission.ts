import router from "./index";
import { useUserStroe } from "@/store/modules/user";
import { PageEnum } from "@/enums/pageEnum";
import NProgress from 'nprogress'

const whitePathList: string[] = [
  PageEnum.BASE_LOGIN
]

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})

router.afterEach(() => {
  NProgress.done()
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { getToken, getUserInfoAction } = useUserStroe()
  if (getToken) {
    if (to.path === PageEnum.BASE_LOGIN) {
      return next(PageEnum.BASE_HOME)
    }
    await getUserInfoAction()
    next()
  } else {
    if (whitePathList.includes(to.path)) {
      next()
      return
    } else {
      next(PageEnum.BASE_LOGIN)
    }
  }
})