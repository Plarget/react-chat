import axios from "axios"
import { TSearchUserList, TUsersServices } from "./types"

axios.defaults.withCredentials = true

const BASE_URL = "https://ya-praktikum.tech/api/v2"

const usersServices: TUsersServices = {
  changeAvatar: async (file) => {
    const formData = new FormData()

    if (file) formData.append("avatar", file)

    return axios.put(`${BASE_URL}/user/profile/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  },
  changeProfile: async (data) => {
    return axios.put(`${BASE_URL}/user/profile`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  changePassword: async (data) => {
    return axios.put(`${BASE_URL}/user/password`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  searchUser: async (data) => {
    return axios.post<TSearchUserList>(`${BASE_URL}/user/search`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((resp ) => resp.data)
  }
}

export default usersServices