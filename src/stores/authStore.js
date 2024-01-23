import { defineStore } from 'pinia'
import AuthService from '@/services/auth'
import { errorNotify, successNotify } from '@/composables//useNotification'
import router from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state:()=> ({
    token: localStorage.getItem('_custom_token') || null,
    user: null,
    authenticated: !!localStorage.getItem('_custom_token'),
  }),
  getters:{
    getAuthToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
    getCurrentUser: (state) => state.user,
    getUserId: (state) => state.user?.id,
  },
  actions: {
    async signUp(payload) {
      try {
        const res = await AuthService.addUsers(payload)
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
        const currentUser = res.data?.find(user => user.email === formData?.email)

        if (!currentUser) {
          return errorNotify('Login Failed', 'Email does not exist')
        }

        if (currentUser.password !== formData?.password) {
          return errorNotify('Login Failed', 'Password didn"t match')
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
    async loadUserData() {
      try {
        const res = await this.getUsersList()
        const currentUser = res.data?.find(user => user.token === this.token)

        if (currentUser) {
          this.updateUser(currentUser)
        }
      } catch (err) {
        errorNotify('error', 'Failed to load user data')
      }
    },
    updateUser(updatedUserData) {
      this.user = updatedUserData
    },
    logout() {
      localStorage.removeItem('_custom_token')
      router.push({ name: 'login' })
      this.token = null
      this.user = null
      this.authenticated = false
    },
  },
})
