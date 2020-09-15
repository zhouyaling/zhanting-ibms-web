import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/Index'
import EarthPage from '@/pages/earth'
import DetailPage from '@/pages/ibms/detail'
import IbmsPage from '@/pages/ibms/ibms'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IbmsPage',
      component: IbmsPage
    },
    // {
    //   path: '/index',
    //   name: 'IndexPage',
    //   component: IndexPage
    // },
    // {
    //   path: '/earth',
    //   name: 'EarthPage',
    //   component: EarthPage
    // },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage
    }
  ]
})
