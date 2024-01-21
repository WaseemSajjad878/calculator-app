<script setup>
import { ref, onMounted , computed } from 'vue';
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const  drawer = ref(true)


const logout = async () => {
  await authStore.logout()
}

const userFullName = computed(()=> {
  return authStore?.getCurrentUser?.firstName + ' ' +  authStore?.getCurrentUser?.lastName
})

const num1 = ref(0);
const num2 = ref(0);
const result = ref(0);
const selectedFormat = ref('usd');

const history = ref([]);

const performOperation = (operation) => {
  const entry = {
    operation,
    num1: num1.value,
    num2: num2.value,
    operator: '',
    result: 0,
  };

  switch (operation) {
    case 'add':
      entry.operator = '+';
      entry.result = num1.value + num2.value;
      break;
    case 'subtract':
      entry.operator = '-';
      entry.result = num1.value - num2.value;
      break;
    case 'multiply':
      entry.operator = '*';
      entry.result = num1.value * num2.value;
      break;
    case 'divide':
      entry.operator = '/';
      entry.result = num1.value / num2.value;
      break;
    default:
      entry.result = 0;
  }

  // Add the calculation entry to the history
  history.value.push(entry);
};

const deleteHistoryEntry = (index) => {
  // Remove the history entry at the specified index
  history.value.splice(index, 1);
};

const formattedResult = computed(() => {
  const currencySymbol = selectedFormat.value === 'usd' ? '$' : '€';
  return `${currencySymbol}${result.value.toFixed(2)}`;
});

// onMounted(async ()=> {
//   await console.log('authStore?.getCurrentUser' , authStore?.getCurrentUser)
// })

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

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
        bordered
        side="right"
        class="flex column"
      >
     

        <q-img  src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold"> {{ userFullName }}  </div>
          </div>
        </q-img>

          <q-list class="q-mt-auto">
              <q-item @click="logout" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>

                <q-item-section>
                  Logout
                </q-item-section>
              </q-item>
          </q-list>

      </q-drawer>

      <q-page-container>
        <q-page padding>
      <div>
    <label for="num1">Number 1:</label>
    <input type="number" v-model="num1" id="num1" />

    <label for="num2">Number 2:</label>
    <input type="number" v-model="num2" id="num2" />

    <button @click="performOperation('add')">Add</button>
    <button @click="performOperation('subtract')">Subtract</button>
    <button @click="performOperation('multiply')">Multiply</button>
    <button @click="performOperation('divide')">Divide</button>

    <div>
      <label for="formatToggle">Switch Format:</label>
      <select v-model="selectedFormat" id="formatToggle">
        <option value="usd">USD</option>
        <option value="euro">Euro</option>
      </select>
    </div>

    <div>
      <strong>Result:</strong>
      <span>{{ formattedResult }}</span>
    </div>
  </div>

   <div>
      <h2>Calculation History</h2>
      <ul>
        <li v-for="(entry, index) in history" :key="index">
          {{ entry.operation }}: {{ entry.num1 }} {{ entry.operator }} {{ entry.num2 }} = {{ entry.result }}
          <button @click="deleteHistoryEntry(index)">Delete</button>
        </li>
      </ul>
    </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>


<style lang="scss" scoped>
.border-right{
  border-right: 1px solid #eee;
}
</style>