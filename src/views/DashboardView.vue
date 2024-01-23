<script setup>
import { ref, computed , onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import BasicCalculator from '@/components/BasicCalculator.vue'

const authStore = useAuthStore()
const drawer = ref(true)

const logout = async () => {
  await authStore.logout()
}

const userFullName = computed(() => {
  return authStore?.getCurrentUser?.firstName + ' ' + authStore?.getCurrentUser?.lastName
})

onMounted(async ()=> {
 await authStore?.loadUserData()
})


</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container class="shadow-2 window-height rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Dashboard</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400" bordered side="right" class="flex column">
        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">{{ userFullName }}</div>
          </div>
        </q-img>

        <q-list>
          <q-item @click="logout" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <BasicCalculator />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
.border-right {
  border-right: 1px solid #eee;
}
</style>