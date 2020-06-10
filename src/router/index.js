import Vue from 'vue'
import Router from 'vue-router'
import App from "../App"
import HelloWorld from '@/components/HelloWorld'
import PageOne from '@/components/PageOne'
import PageTwo from '@/components/PageTwo'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '导航1',
      component: Index,
      redirect: "/pageOne",
      children:[
        {
          path:'/pageOne',
          name :'页面1',
          component: PageOne
        },
        {
          path:'/pageTwo',
          name :'页面2',
          component: PageTwo
        }

      ]
    },
    
   
  ]
})
