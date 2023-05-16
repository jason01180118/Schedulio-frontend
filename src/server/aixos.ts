import axios, { type AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const example = async (): Promise<AxiosResponse<any, any>> => { return await instance.post('/path', 'formdata') }
