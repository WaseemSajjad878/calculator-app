<script setup>
import {ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AuthWrapper from '@/components/AuthWrapper.vue'
import { required , email , password } from '@/composables/useValidations'
import { usePasswordVisibility } from '@/composables/usePasswordVisibility'

const authStore = useAuthStore()
const { passwordVisible, togglePasswordVisibility } = usePasswordVisibility([false, false])

const formData = ref({
   email: '',
   password: '' 
})


const submit = async () => {
  await authStore.login(formData.value)
}

</script>

<template>
  <AuthWrapper>
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
            no-error-icon
            autocomplete
            :rules="[required , email]"
          />
        </div>
        <div class="col-12">
           <q-input
            class="q-mt-md custom-q-input"
            outlined
            v-model="formData.password"
           :type="passwordVisible[0] ? 'text' : 'password'"
            label="Password"
            lazy-rules
            no-error-icon
            autocomplete
            :rules="[required , password]"
                >
             <template #append>
                <q-icon
                  class="cursor-pointer"
                  :name="passwordVisible[0] ? 'visibility' : 'visibility_off'"
                  color="grey-10"
                  @click="togglePasswordVisibility(0)"
                />
              </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-btn
            unelevated
            rounded
            color="primary"
            type="submit"
            class="full-width q-py-sm q-mb-md"
            label="Login"
          />
          <div class="flex items-center">
             Haven't signed up?  
            <router-link class="text-blue-10 q-ml-xs" to="/sign-up"> Sign Up </router-link>
          </div>
        </div>
      </div>
    </q-form>
  </AuthWrapper>
</template>
