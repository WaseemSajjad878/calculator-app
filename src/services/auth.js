import { api } from './axios'

const createCustomToken = (user) => {
    const payload = {
        sub: user.id,
        fullName: user.fullName,
        email: user.email,
    }

    const encodedPayload = btoa(JSON.stringify(payload))
    return `your_static_secret_key.${encodedPayload}.your_static_secret_key`
}

export default {
    async getUsers() {
        return await api.get('/users')
    },
    async addUsers(payload) {
        const token = createCustomToken(payload)
        const res = await api.post('/users', { ...payload, token })
        return res
    }
}
