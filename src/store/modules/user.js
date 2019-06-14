import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import constantRoutes from '@/router/index'
import Layout from '@/layout'
import qs from 'qs'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  mail: '',
  sex: '',
  type: '',
  age: '',
  phone: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_MAIL: (state, mail) => {
    state.mail = mail
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_AGE: (state, age) => {
    state.age = age
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  }
}

const actions = {
  setroutes({ commit }) {
    return new Promise((resolve) => {
      commit('SET_NAME', sessionStorage.getItem('name'))
      commit('SET_TYPE', sessionStorage.getItem('type'))
      commit('SET_SEX', sessionStorage.getItem('sex'))
      commit('SET_AGE', sessionStorage.getItem('age'))
      commit('SET_MAIL', sessionStorage.getItem('mail'))
      commit('SET_PHONE', sessionStorage.getItem('phone'))
      if (sessionStorage.getItem('type') === '2') {

        console.log('3')
        const a =[
          {
            path: '/',
            component: Layout,
            redirect: '/firstpage',
            children: [{
              path: 'firstpage',
              name: 'Firstpage',
              component: () => import('@/views/firstpage/index'),
              meta: { title: '首页', icon: 'dashboard' }
            }]
          },
          {
            path: '/',
            component: Layout,
            redirect: '/tiketmanage',
            children: [{
              path: 'tiketmanage',
              name: 'Tiketmanage',
              component: () => import('@/views/tiketmanage/index'),
              meta: {title: '票务管理', icon: 'dashboard'}
            }]
          }

        // {
        //   path: '/',
        //   component: Layout,
        //   name: 'HomePage',
        //   children: [{
        //     path: 'homepage',
        //     name: 'HomePage',
        //     component: () => import('@/views/homepage/index'),
        //     meta: { title: '个人主页', icon: 'user' }
        //   }]
        // },
        //   {
        //     path: '/',
        //     component: Layout,
        //     name: 'Ticketbuy',
        //     children: [{
        //       path: 'ticketbuy',
        //       name: 'Ticketbuy',
        //       component: () => import('@/views/ticketbuy/index'),
        //       meta: { title: '开始购票', icon: 'table' }
        //     }]
        //   },
        //   {
        //     path: '/',
        //     component: Layout,
        //     children: [
        //       {
        //         path: 'form',
        //         name: 'Form',
        //         component: () => import('@/views/form/index'),
        //         meta: { title: '查看订单', icon: 'form' }
        //       }
        //     ]
        //   }
          ]
        constantRoutes.addRoutes(a)
        for (var i = 0; i < a.length; i++) {
          constantRoutes.options.routes.push(a[i])
        }
      }
      else {
        const a = [
          {
            path: '/',
            component: Layout,
            redirect: '/firstpage2',
            children: [{
              path: 'firstpage2',
              name: 'Firstpage2',
              component: () => import('@/views/firstpage2/index'),
              meta: { title: '首页', icon: 'dashboard' }
            }]
          },
          {
            path: '/',
            component: Layout,
            name: 'HomePage',
            children: [{
              path: 'homepage',
              name: 'HomePage',
              component: () => import('@/views/homepage/index'),
              meta: { title: '个人主页', icon: 'user' }
            }]
          },
            {
              path: '/',
              component: Layout,
              name: 'Ticketbuy',
              children: [{
                path: 'ticketbuy',
                name: 'Ticketbuy',
                component: () => import('@/views/ticketbuy/index'),
                meta: { title: '开始购票', icon: 'table' }
              }]
            },
            {
              path: '/',
              component: Layout,
              children: [
                {
                  path: 'form',
                  name: 'Form',
                  component: () => import('@/views/form/index'),
                  meta: { title: '查看订单', icon: 'form' }
                }
              ]
            }
        ]
        constantRoutes.addRoutes(a)
        for (var i = 0; i < a.length; i++) {
          constantRoutes.options.routes.push(a[i])
        }
      }
      resolve()
    })
  },
  // user login
  login: function({ dispatch, commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // console.log(response)
        const id = response[1]
        commit('SET_TYPE', response[0])
        sessionStorage.setItem('type', state.type)
        commit('SET_TOKEN', id)
        sessionStorage.setItem('id', state.token)
        setToken(id)
        getInfo(sessionStorage.getItem('id'))
          .then(response => {
            console.log(response)
            commit('SET_NAME', response.name)
            commit('SET_AVATAR', response.avatar)
            commit('SET_SEX', response.sex)
            commit('SET_AGE', response.age)
            commit('SET_MAIL', response.email)
            commit('SET_PHONE', response.userphone)
            sessionStorage.setItem('name', state.name)
            sessionStorage.setItem('mail', state.mail)
            sessionStorage.setItem('phone', state.phone)
            sessionStorage.setItem('sex', state.sex)
            sessionStorage.setItem('age', state.age)
          })
        dispatch('setroutes')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo('1').then(response => {
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

