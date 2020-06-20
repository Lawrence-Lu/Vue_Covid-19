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
      name: 'Covid-19病例预测',
      component: Index,
      redirect: "/pageOne",
      children:[
        {
          path:'/pageOne',
          name :'EDA',
          component: PageOne
        },
        {
          path:'/pageTwo',
          name :'预测病例',
          component: PageTwo
        }

      ]
    },
    
   
  ]
})
