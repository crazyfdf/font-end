import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _86b262c0 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _03a72dd5 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _7176d533 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _6f85b61a = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _5eb0ebce = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _9e50163a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _a1f12f80 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _86b262c0,
    children: [{
      path: "",
      component: _03a72dd5,
      name: "home"
    }, {
      path: "/login",
      component: _7176d533,
      name: "login"
    }, {
      path: "/register",
      component: _7176d533,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _6f85b61a,
      name: "profile"
    }, {
      path: "/settings",
      component: _5eb0ebce,
      name: "settings"
    }, {
      path: "/editor",
      component: _9e50163a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a1f12f80,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
