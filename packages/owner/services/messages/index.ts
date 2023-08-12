import { API } from "@project/shared"

export const GetAllMessagesByRoomId = (id) => {
    return API.get(`/messages/get-room-cov/${id}`)
}

