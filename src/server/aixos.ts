import axios, { type AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const sendMail = async (mail: string): Promise<AxiosResponse<any, any>> => {
  return await instance.get('/mail/invite', {
    params: {
      token: process.env.REACT_APP_TOKEN,
      email: mail
    }
  })
}

export const logIn = async (account: string, password: string): Promise<AxiosResponse<any, any>> => {
  return await instance.post('/sign_up', {
    data: {
      account,
      password
    }
  })
}
