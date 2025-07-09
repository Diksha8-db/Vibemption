import axios from 'axios'

const instance = axios.create({
    baseURL : `${import.meta.env.BACKEND_URL}/api/v1`,
    withCredentials: true
})

export default instance