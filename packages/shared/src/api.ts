import axios from "axios"

axios.defaults.responseType = "json"

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
})

const NO_AUTH_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
})


const REFRESH_TOKEN_URL = "http://localhost:8000/login/refresh"
// A request interceptor
API.interceptors.request.use(
    async (config) => {
        const session =
            typeof sessionStorage !== "undefined" ? sessionStorage : null
        if (session?.getItem("X-Agent-User")) {
            config.headers["X-Agent-User"] = session.getItem("X-Agent-User")
        }
        const accessToken = localStorage.getItem("USER_ACCESS_TOKEN")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// // A response interceptor
API.interceptors.response.use(
    (response) => response?.data,
    async (error) => {
        const originalRequest = error.config

        // if error with 401 status code implying unauthorized user/expired access token.
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = localStorage.getItem("USER_REFRESH_TOKEN")

            if (!refreshToken) {
                return Promise.reject(new Error("Refresh token not found"))
            }

            try {
                // using refresh_token to refresh access token by sending it within header.
                const response = await axios.post(
                    REFRESH_TOKEN_URL,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                )
                const newAccessToken = response.data.msg.access_token
                localStorage.setItem("USER_ACCESS_TOKEN", newAccessToken)
                originalRequest.headers["Authorization"] = "Bearer " + newAccessToken

                return API(originalRequest) // This piece of code makes original request and returns the response.
            } catch (refreshError) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error.response)
    }
)



export { API, NO_AUTH_API }
