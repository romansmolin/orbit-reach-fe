import axios from 'axios'

import { logoutAndRedirectHome } from '@/shared/lib/auth/session'

// Create a custom axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

if (typeof window !== 'undefined') {
    let hasClearedSession = false
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === 401 && !hasClearedSession) {
                hasClearedSession = true
                logoutAndRedirectHome()
                window.setTimeout(() => {
                    hasClearedSession = false
                }, 1000)
            }
            return Promise.reject(error)
        }
    )
}

export default api
