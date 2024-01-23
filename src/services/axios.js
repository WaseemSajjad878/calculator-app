import axios from 'axios'

const baseUrl = 'http://localhost:7000'

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
})

export { api }
