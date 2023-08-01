
import { NO_AUTH_API } from "@project/shared"


export const CreateUser = (val) => {
    return NO_AUTH_API.post(`/users`, val)
}

export const LoginUser = (val) => {
    return NO_AUTH_API.post(`/login`, val)
}

