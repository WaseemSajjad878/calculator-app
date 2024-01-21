<script setup>
import { ref , computed } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const result = ref(null)
const selectedCurrency = ref('USD')

const calculate = (operation) => {
  switch (operation) {
    case 'add':
      result.value = num1.value + num2.value
      break
    case 'subtract':
      result.value = num1.value - num2.value
      break
    case 'multiply':
      result.value = num1.value * num2.value
      break
    case 'divide':
      if (num2.value !== 0) {
        result.value = num1.value / num2.value
      } else {
        result.value = 'Cannot divide by zero'
      }
      break
  }
}

const formattedResult = computed(() => {
  const currencySymbol = selectedCurrency.value === 'USD' ? '$' : '€'
  const resultValue = parseFloat(result.value)

  return !isNaN(resultValue) ? `${currencySymbol}${resultValue.toFixed(2)}` : currencySymbol+'0.00'
})
</script>

<template>
 <div class="calculator">
    <h3 class="q-my-sm">Basic Calculator</h3>

    <div class="input-section">
      <q-input outlined v-model="num1" label="Number 1" type="number" class="q-mt-md custom-q-input" no-error-icon autocomplete />
      <q-input outlined v-model="num2" label="Number 2" type="number" class="q-mt-md custom-q-input" no-error-icon autocomplete />
      <q-select outlined v-model="selectedCurrency" label="Select Currency" :options="['USD','EUR']" class="q-mt-md custom-q-input" no-error-icon autocomplete />
    </div>

    <div class="button-section">
      <button @click="calculate('add')">Add</button>
      <button @click="calculate('subtract')">Subtract</button>
      <button @click="calculate('multiply')">Multiply</button>
      <button @click="calculate('divide')">Divide</button>
    </div>
    <div class="result-section">
      <p>Result: {{ formattedResult }}</p>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.input-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 8px;
  margin-bottom: 10px;
}

.button-section {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px;
  flex: 1;
  margin: 0 5px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.result-section {
  text-align: center;
  margin-top: 15px;
}

p {
  color: #333;
  font-weight: bold;
}

.currency-switch {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  color: #555;
}

select {
  padding: 8px;
}
</style>