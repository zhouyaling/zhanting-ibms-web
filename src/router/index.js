import Vue from 'vue'
import Router from 'vue-router'
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
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage
    }
  ]
})
