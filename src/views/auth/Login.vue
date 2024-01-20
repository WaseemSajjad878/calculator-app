<script setup>
import { reactive } from 'vue'
// import { useAuthStore } from '../../stores/auth'
// import { required, email } from '@/composables/validations'

// const authStore = useAuthStore()

// const defaultValues = { email: '', password: '' }

const formData = reactive({ email: '', password: '' })

const submit = async () => {
  console.log('values', formData)
  // await authStore.login(data.value)
}
</script>

<template>
  <div class="login-wrapper bg-banner window-height">
    <div class="row justify-center items-center full-height q-mx-none">
      <div class="col-11 col-sm-8 col-md-7 col-lg-6">
        <q-card class="rounded-borders q-pa-lg">
          <q-form @submit="submit" :greedy="true">
            <h4 class="text-h4 text-center text-weight-bold q-my-none">Login</h4>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  outlined
                  v-model="formData.email"
                  label="Email"
                  class="q-mt-md custom-q-input"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Email is required']"
                />
              </div>
              <div class="col-12">
                <q-input
                  class="q-mt-md custom-q-input"
                  outlined
                  v-model="formData.password"
                  label="Password"
                   lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Password is required']"
                />
              </div>
              <div class="col-12 text-right">
                <q-btn unelevated rounded color="primary" type="submit" class="full-width q-py-sm q-mb-md" label="Login" />
                <router-link class="text-black" to="/">
                  Forgot Password?
                </router-link>
              </div>
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-banner {
  background: url('@/assets/images/banner.jpg') no-repeat;
  background-size: cover;
}
</style>
