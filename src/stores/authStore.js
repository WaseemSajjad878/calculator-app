import { defineStore } from 'pinia'
import AuthService from '@/services/auth'
import { errorNotify, successNotify } from '@/composables//useNotification'
import router from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state:()=> ({
    token: localStorage.getItem('_custom_token') ?? null,
    user: JSON.parse(localStorage.getItem('_user_data')) ?? null,
    authenticated: localStorage.getItem('_custom_token') ? true : false
  }),
  getters:{
    getAuthToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
    getCurrentUser: (state) => state.user
  },
  actions: {
    async signUp(payload) {
      try {
        const res = await AuthService.addUsers(payload)
        console.log('response', res)
      } catch (err) {
        errorNotify('error', err.data.message)
      } 
    },
    async getUsersList() {
      try {
        const res = await AuthService.getUsers()
        if (res.status === 200) {
          return res
        }
      } catch (err) {
        errorNotify('error', err.data.message)
      } 
    },
    async login(formData) {
      try {
        const res = await this.getUsersList()
        const currentUser = res.data?.find(user => user.email === formData.email)
        const isEmailExist = currentUser?.email === formData.email ? true : false
        const isPasswordMatched = currentUser?.password === formData.password ? true : false
        console.log('isEmailExist', isEmailExist , isPasswordMatched)

        if (!isEmailExist) {
          errorNotify('Login Failed', 'Email does not exist')
          return
        }

        else if (!isPasswordMatched) {
          errorNotify('Login Failed', 'Password didn"t match')
          return
        }
        localStorage.setItem('_custom_token', currentUser?.token)
        this.token = currentUser?.token
        this.authenticated = true
        this.updateUser(currentUser)
        router.push({ name: 'dashboard' })
        successNotify('Success!', 'Logged in successfully')
      } catch (err) {
        errorNotify('error', err.data?.message)
      }
    },
    updateUser(updatedUserData) {
      this.user = updatedUserData
      localStorage.setItem('_user_data', JSON.stringify(updatedUserData))
    },
    logout() {
      localStorage.removeItem('_custom_token')
      localStorage.removeItem('_user_data')
      router.push({ name: 'login' })
      this.token = null
      this.user = null
      this.authenticated = false
    },
  },
})
