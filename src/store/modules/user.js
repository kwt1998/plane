import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import constantRoutes from '@/router/index'
import Layout from '@/layout'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  type: ''
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
  }
}

const actions = {
  setroutes({ commit }) {
    return new Promise((resolve) => {
      console.log(sessionStorage.getItem('type'))
      if (sessionStorage.getItem('type') === '1') {
        console.log('3')
        const a = [{
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
        }]
        constantRoutes.addRoutes(a)
        for (var i = 0; i < a.length; i++) {
          constantRoutes.options.routes.push(a[i])
        }
      }
      resolve()
    })
  },
  // user login
  login({ dispatch, commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // console.log(response)
        // const { data } = response
        commit('SET_TOKEN', response)
        commit('SET_NAME', '111')
        commit('SET_AVATAR', '111')
        commit('SET_TYPE', '1')
        setToken(response)
        sessionStorage.setItem('user', state.name)
        sessionStorage.setItem('type', state.type)
        dispatch('setroutes')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log(response)
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

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

