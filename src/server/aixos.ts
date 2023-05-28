import axios, { type AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const sendMail = async (mail: string): Promise<AxiosResponse<any, any>> => {
  return await instance.get('/mail/send', {
    params: {
      token: process.env.REACT_APP_TOKEN,
      email: mail
    }
  })
}

export const sendInvite = async (mail: string): Promise<AxiosResponse<any, any>> => {
  return await instance.get('/mail/invite', {
    params: {
      token: process.env.REACT_APP_TOKEN,
      email: mail
    }
  })
}

export const logIn = async (account: string, password: string): Promise<AxiosResponse<any, any>> => {
  return await instance.post('/log_in', {
    data: {
      account,
      password
    }
  })
}

export const signUp = async (account: string, password: string): Promise<AxiosResponse<any, any>> => {
  return await instance.post('/sign_up', {
    data: {
      account,
      password
    }
  })
}

export const getCalendar = async (session: string, account: string): Promise<AxiosResponse<any, any>> => {
  return await instance.get(`/get_calendar/${account}`, { params: { session } })
}
