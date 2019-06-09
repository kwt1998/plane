import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import constantRoutes from '@/router/index'
import Layout from '@/layout'

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
        const id = response
        this.$ajax.post('/updateUserInfo' + id, {
        })
          .then(function(response) {
            console.log(response)
            const { data } = response
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_TYPE', data.type)
            commit('SET_SEX', data.sex)
            commit('SET_AGE', data.age)
            commit('SET_MAIL', data.mail)
            commit('SET_PHONE', data.phone)
            commit('SET_TOKEN', id)
            setToken(id)
          })
          .catch(function(error) {
            console.log(error)
          })
        // const { data } = response
        // commit('SET_TOKEN', response)
        // commit('SET_NAME', '111')
        // commit('SET_AVATAR', '111')
        // commit('SET_TYPE', '1')
        // commit('SET_SEX', '男')
        // commit('SET_AGE', '18')
        // commit('SET_MAIL', '786005261@qq.com')
        // commit('SET_PHONE', '18379258365')
        sessionStorage.setItem('name', state.name)
        sessionStorage.setItem('type', state.type)
        sessionStorage.setItem('mail', state.mail)
        sessionStorage.setItem('phone', state.phone)
        sessionStorage.setItem('sex', state.sex)
        sessionStorage.setItem('age', state.age)
        dispatch('setroutes')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }){
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

