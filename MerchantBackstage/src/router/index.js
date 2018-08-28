import Vue from 'vue'
import Router from 'vue-router'

import Index from '../view/index'
import Login from '../view/login'
import productManage from '../view/product-manage/product-manage'
import codeManage from '../view/code-manage/code-manage'
import userManage from '../view/user-manage/user-manage'
import developManage from '../view/develop-manage/index'
import developContent from '../view/develop-manage/children/content'
import * as types from "../../../../Service-Number/service/src/store/types";
import store from "../../../../Service-Number/service/src/store/store";

Vue.use(Router)

// export default new Router({

  const routes=[
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',     //首页
      name: 'index',
      meta: {
        requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
        title: '首页'
      },
      component: Index,
      redirect: '/productManage',
      meta: {
        // requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
        title: '商户后台'
      },
      children: [
        {path: '/productManage',
          meta: {
            requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
            title: '运营报表'
          },
          component: productManage},
        {path: '/codeManage',
          meta: {
            requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
            title: '交易流水查询'
          },
          component: codeManage},
        {path: '/userManage',
          meta: {
            requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
            title: '账户管理'
          },
          component: userManage},
          {path: '/developManage',
          meta: {
            requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
            title: '开发管理'
          },
          component: developManage},
          {path: '/developManage/content',
          meta: {
            requireAuth: true,   // 添加该字段，表示进入这个路由是需要登录的  (登录拦截)
            title: '开发管理应用信息'
          },
          component: developContent},
      ],
    },
    {
      path: '/4',
      name: 'userManage',
      component: userManage
    },
  ];
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  let token=localStorage.getItem("token");
  store.commit(types.LOGIN,token)
};
const router = new Router({
  routes
});
//(登录拦截)
// * to: Route: 即将要进入的目标 路由对象
// * from: Route: 当前导航正要离开的路由
// * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
// * next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
// * next(‘/’) 或者 next({ path: ‘/’ }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    console.log(store.state.token)
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }else {
    next();
  }
})
export default router;
// })

