import { defineStore } from 'pinia'
import AuthService from '@/services/auth'
import { errorNotify, successNotify } from '@/composables//useNotification'
import router from '../router'

export const useAuthStore = defineStore({
  id: 'auth',
  state:()=> ({
    token: localStorage.getItem('_token') ?? null,
    user: JSON.parse(localStorage.getItem('_user')) ?? null,
    authenticated: localStorage.getItem('_token') ? true : false
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
          errorNotify("Login Failed", "Email does not exist")
          return;
        }

        else if (!isPasswordMatched) {
          errorNotify("Login Failed", "Password didn't match")
          return;
        }
        localStorage.setItem('_token', currentUser?.token)
        this.token = currentUser?.token
        this.authenticated = true
        this.updateUser(currentUser)
        router.push('/dashboard')
        successNotify('Success!', 'Logged in successfully')
      } catch (err) {
        errorNotify('error', err.data?.message)
      }
    },
    updateUser(updatedUserData) {
      this.user = updatedUserData;
      localStorage.setItem('_user', JSON.stringify(updatedUserData));
    },
    logout() {
      localStorage.removeItem('_token')
      localStorage.removeItem('_user')
      router.push('/login')
      this.token = null
      this.user = null
      this.authenticated = false
    },
  },
})
