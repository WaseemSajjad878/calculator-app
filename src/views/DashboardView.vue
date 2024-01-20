<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
}

</script>

<template>
    <div>
        dashboard btn 
         <q-btn @click="logout" color="negative" label="Logiout" />
    </div>
</template>