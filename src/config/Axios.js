import axios from 'axios'
import { CONSTANTS } from '../utils/constants'

const managementAxiosInstance = axios.create({
  baseURL: CONSTANTS.HOSTS.MANAGEMENT,
})
const tiAxiosInstance = axios.create({
  baseURL: CONSTANTS.HOSTS.TI,
})
const mlModelAxiosInstance = axios.create({
  baseURL: CONSTANTS.HOSTS.ML_MODEL,
})

managementAxiosInstance.interceptors.request.use(async function (config) {
  return setHeaders(config)
})

tiAxiosInstance.interceptors.request.use(async function (config) {
  return setHeaders(config)
})

mlModelAxiosInstance.interceptors.request.use(async function (config) {
  return setHeaders(config)
})

const setHeaders = (config) => {
  let token = localStorage.getItem('token')
  token = token ? JSON.parse(token) : ''

  config.headers.Authorization = token
    ? `${token}`
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmYyNmFiNWU5NDAwZjI0YTZlMGU2MDgiLCJleHAiOjE4MjExNTc3MjB9.QsPxUevOSpXWZtcZm21GoLzm92QB05nr8nBUgFq9gpw'
  config.headers['Content-Type'] = 'application/json'
  return config
}

export { managementAxiosInstance, tiAxiosInstance, mlModelAxiosInstance }

// Testing URL - https://eventus-backend.onrender.com
// Local URL - http://127.0.0.1:5000
