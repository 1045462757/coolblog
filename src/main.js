// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import globalApi from './util/Api.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { getCookie } from "@/util/cookie.js";

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

Vue.prototype.globalApi = globalApi

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (getCookie("account") != "") {
      iView.LoadingBar.start();
      next();
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    iView.LoadingBar.start();
    next();
  }
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});
