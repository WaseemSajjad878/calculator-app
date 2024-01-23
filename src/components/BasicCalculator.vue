<script setup>
import { ref, computed , watch } from 'vue'
import { useCalculationHistoryStore } from '@/stores/calculationStore'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const calculationStore = useCalculationHistoryStore()
const num1 = ref(null)
const num2 = ref(null)
const result = ref(null)
const selectedCurrency = ref('USD')


const getUserId = computed(()=> {
  return authStore?.getUserId
})

const calculate = async (operation) => {
  const value1 = parseFloat(num1.value)
  const value2 = parseFloat(num2.value)

  if (isNaN(value1) || isNaN(value2)) {
    result.value = 'Invalid input'
    return
  }

  switch (operation) {
    case 'add':
      result.value = value1 + value2
      break
    case 'subtract':
      result.value = value1 - value2
      break
    case 'multiply':
      result.value = value1 * value2
      break
    case 'divide':
      if (value2 !== 0) {
        result.value = value1 / value2
      } else {
        result.value = 'Cannot divide by zero'
      }
      break
  }
  console.log('operation', operation)
  const calculation = {
    operation,
    num1: parseFloat(num1.value),
    num2: parseFloat(num2.value),
    result: formattedResult.value,
    timestamp: new Date().toLocaleString()
  }


 await calculationStore.addToHistory(calculation , authStore?.getUserId)
}

const formattedResult = computed(() => {
  const currencySymbol = selectedCurrency.value === 'USD' ? '$' : '€'
  const resultValue = parseFloat(result.value).toFixed(2)
  const isNumber = !isNaN(resultValue) ? true : false
  const isValueNegative = resultValue < 0 ? true : false
  let absValue

  if (!isValueNegative && isNumber) {
    return `${currencySymbol}${resultValue}`
  } else if (isValueNegative && isNumber) {
    absValue = Math.abs(resultValue)
    return `-${currencySymbol}${absValue}`
  } else return `${currencySymbol}0.00`
})

watch(()=> authStore?.getUserId, async()=> {
  await calculationStore?.loadHistory(getUserId.value)
}, { immediate: true })


</script>

<template>
  <div class="row">
    <div class="col-12">
      <q-card class="calculator-wrapper q-mx-auto">
        <q-card-section> {{ authStore?.getUserId }}
          <h4 class="text-center q-my-md">Basic Calculator</h4>
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input
                outlined
                v-model="num1"
                label="Number 1"
                type="number"
                class="custom-q-input"
                no-error-icon
                autocomplete
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="num2"
                label="Number 2"
                type="number"
                class="custom-q-input"
                no-error-icon
                autocomplete
              />
            </div>
            <div class="col-12">
              <q-select
                outlined
                v-model="selectedCurrency"
                label="Select Currency"
                :options="['USD', 'EUR']"
                class="custom-q-input"
                no-error-icon
                autocomplete
              />
            </div>
            <div class="col-12 flex items-center justify-between">
              <q-btn @click="calculate('add')" size="sm" color="negative" label="Add" />
              <q-btn @click="calculate('subtract')" size="sm" color="negative" label="Subtract" />
              <q-btn @click="calculate('multiply')" size="sm" color="negative" label="Multiply" />
              <q-btn @click="calculate('divide')" size="sm" color="negative" label="Divide" />
            </div>
            <div class="col-12">
              <p>Result: {{ formattedResult }}</p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 text-center">
      <h4 class="q-my-lg">Calculation History</h4>
      
      <template v-if="calculationStore?.history?.length > 0">
        <q-btn @click="calculationStore?.clearHistory()" size="sm" color="negative" label="Clear History" />
        <q-list bordered separator class="q-mt-md">
          <q-item  v-for="(calculation, index) in calculationStore?.history" :key="'uniqueKey' + index">
            <q-item-section>Operation: {{ calculation?.operation }}</q-item-section>
            <q-item-section>Numbers: {{ calculation?.num1 + ' , ' + calculation.num2 }} </q-item-section>
            <q-item-section>Result: {{ calculation?.result }}</q-item-section>
            <q-item-section>Timestamp: {{ calculation?.timestamp }}</q-item-section>
            <q-item-section><q-icon @click="calculationStore?.deleteItem(calculation?.id)" class="cursor-pointer" size="sm" color="negative" name="delete" /></q-item-section>
          </q-item>
        </q-list>
      </template>
      <p v-else >No history available.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calculator-wrapper {
  max-width: 400px
}
</style>
