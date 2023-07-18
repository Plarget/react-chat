import axios from "axios"
import { TAuthServices } from "@/shared/services/types.ts"

axios.defaults.withCredentials = true

const BASE_URL = "https://ya-praktikum.tech/api/v2"

const authServices: TAuthServices = {
  postSignIn: async (data) => {
    return axios.post(`${BASE_URL}/auth/signin`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  postSignUp: async (data) => {
    return axios.post(`${BASE_URL}/auth/signup`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  getUserInfo: async () => {
    return axios.get(`${BASE_URL}/auth/user`)
  },
  postLogOut: async () => {
    return axios.post(`${BASE_URL}/auth/logout`)
  }
}

export default authServices