import { defineStore } from 'pinia'
import HistoryService from '@/services/history'
import { errorNotify, successNotify } from '@/composables//useNotification'

export const useCalculationHistoryStore = defineStore('calculationHistory', {
    state: () => ({
        history: [],
    }),
    
    actions: {
        async addToHistory(calculation , userID) {
            const data = { ...calculation, userID }
            console.log('id', userID)
            try {
                const res = await HistoryService.addHistory(data)
                if (res.status === 201) {
                    this.history.unshift(data)
                    successNotify('Success', 'Calculation added to history.')
                }
            } catch (err) {
                errorNotify('error', err.message)
            }
        },
        async loadHistory(uID) {
            try {
                const res =  await HistoryService.getHistory()
                const filteredHistory = await res.data.filter(item => item.userID === uID)
                if (filteredHistory) {
                    console.log('filteredHistory', filteredHistory)
                    this.history = filteredHistory
                }
                
            } catch (err) {
                errorNotify('error', `${err.message}`)
            }
        },
       async clearHistory() {
        // clear history not working due to json server error
           try {
               const response = await HistoryService.clearHistory()
               console.log('Clear History Response:', response)
               this.history = []
               successNotify('Success', 'History cleared successfully.')
           } catch (err) {
               errorNotify('error', `${err.message}`)
           }
        },
        async deleteItem(id) {
            try {
                const res = await HistoryService.deleteHistoryItem(id)
                const filteredHistory = this.history.filter(item => item.id !== id)
                this.history = filteredHistory

            } catch (err) {
                errorNotify('error', `${err.message}`)
            }
        }
    },
})
