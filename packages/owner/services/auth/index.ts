
import { API } from "@project/shared"


export const CreateUser = (val) => {
    return API.post(`/users`, val)
}

export const LoginUser = (val) => {
    return API.post(`/login`, val)
}

export const RefreshToken = (newTodo) => {
    return API.post(`/login/refresh`)
}

