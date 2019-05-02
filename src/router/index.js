import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/front/Login'
import Register from '@/components/front/Register'
import ForgetPassword from '@/components/front/ForgetPassword'

import Main from '@/components/main/Main'
import WriteBlog from '@/components/main/WriteBlog'
import About from '@/components/main/About'
import UserInformation from '@/components/main/user/Information'

import User from '@/components/main/User'
import MyFocus from '@/components/main/user/MyFocus'
import MyFans from '@/components/main/user/MyFans'
import MyCollection from '@/components/main/user/MyCollection'
import MyRemark from '@/components/main/user/MyRemark'
import Message from '@/components/main/user/Message'
import ModifyPassword from '@/components/main/user/ModifyPassword'

import BlogDetails from '@/components/main/BlogDetails'
import UserDetails from '@/components/main/UserDetails'
import ErrorWeb from '@/components/main/Error'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/writeBlog',
      name: 'writeBlog',
      component: WriteBlog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'information',
        component: UserInformation,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'modifyPassword',
        component: ModifyPassword,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'myCollection',
        component: MyCollection,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'myRemark',
        component: MyRemark,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'myFocus',
        component: MyFocus,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'myFans',
        component: MyFans,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'message',
        component: Message,
        meta: {
          requireAuth: true
        },
      }]
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/blogDetails',
      name: 'BlogDetails',
      component: BlogDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userDetails',
      name: 'UserDetails',
      component: UserDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: "ErrorWeb",
      component: ErrorWeb,
      meta: {
        requireAuth: true
      }
    }
  ]
})


