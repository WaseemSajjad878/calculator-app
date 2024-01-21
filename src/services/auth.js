import axios from 'axios'

const baseUrl = 'http://localhost:7000'

const apiClient = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
})

const createCustomToken = (user)=> {
    const payload = {
        sub: user.id,
        fullName: user.fullName,
        email: user.email,
    }

    const encodedPayload = btoa(JSON.stringify(payload))

    return `your_static_secret_key.${encodedPayload}.your_static_secret_key`
}

export default {
    async getUsers(){
        return await apiClient.get('/users')
  },
 async addUsers(payload){
     const token = createCustomToken(payload) 
     const res = await apiClient.post('/users', {...payload, token})
     return res
    }
}
