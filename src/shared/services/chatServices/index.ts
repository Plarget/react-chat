import axios from "axios"
import { TChatsServices, TGetChatList } from "./types"
import { TGetChatUsers } from "./types"

const BASE_URL = "https://ya-praktikum.tech/api/v2"

const chatsServices: TChatsServices = {
  getChats: async (query) => {
    return axios.get<TGetChatList>(`${BASE_URL}/chats`, {
      params: {title: query}
    })
      .then(({data}) => data)
  },
  createChat: async (data) => {
    return axios.post(`${BASE_URL}/chats`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  deleteChat: async (data) => {
    return axios.delete(`${BASE_URL}/chats`, {
      data,
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  getUsers: async (id) => {
    return axios.get<TGetChatUsers>(`${BASE_URL}/chats/${id}/users`)
      .then(({data}) => data)
  },
  addUsers: async (data) => {
    return axios.put(`${BASE_URL}/chats/users`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  deleteUsers: async (data) => {
    return axios.delete(`${BASE_URL}/chats/users`, {
      data,
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  getToken: async (id) => {
    return axios.post(`${BASE_URL}/chats/token/${id}`)
  },
  changeAvatar: async (data) => {
    return axios.put(`${BASE_URL}/chats/avatar`, {
      ...data,

    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  },
}

export default chatsServices