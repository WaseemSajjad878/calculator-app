import { defineStore } from 'pinia'
import AuthService from '@/services/auth'
import { errorNotify, successNotify } from '@/composables//useNotification'
import router from '../router'

export const useAuthStore = defineStore({
  id: 'auth',
  state:()=> ({
    authenticated: false,
    user: null,
    token: localStorage.getItem('_token') ?? null,
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getAuthStatus: (state) => !!state.user.id || state.token,
    getAuthToken: (state) => state.token,
    getAuthUser: (state) => state.user,
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
          errorNotify("Login Failed", "Email does not exist")
          return;
        }

        else if (!isPasswordMatched) {
          errorNotify("Login Failed", "Password didn't match")
          return;
        }
        // this.user = currentUser
        console.log(this.user)
        localStorage.setItem('_token', currentUser?.token)
        // this.authenticated = true
        router.push('/dashboard')
        successNotify('Success!', 'Logged in successfully')
      } catch (err) {
        errorNotify('error', err.data?.message)
      }
    },
    logout() {
      localStorage.removeItem('_token')
      router.push('/login')
      this.authenticated = false
      // this.token = null
      // this.user = null
    },
  },
})
