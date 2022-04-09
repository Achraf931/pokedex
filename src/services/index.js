import axios from 'axios'

export const baseURL = process.env.VUE_APP_API
export const handler = axios.create({ baseURL })
