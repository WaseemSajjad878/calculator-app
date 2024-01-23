import { api } from './axios'

export default {
    async addHistory(payload) {
        return await api.post('/history', payload)
    },
    async getHistory() {
        return await api.get('/history')
    },
    async clearHistory() {
        return await api.delete('/history')
    },
    async deleteHistoryItem(id) {
        return await api.delete(`/history/${id}`)
    },
}
