

import { API } from "@project/shared"


export const FollowSuggestions = () => {
    return API.get(`/users/follow-suggestions`)
}

export const FollowUser = (val) => {
    return API.post(`/users/follow-user`, val)
}

