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

export const sendInvite = async (session: string, title: string, content: string, startDate: string, endDate: string, account: string): Promise<AxiosResponse<any, any>> => {
  console.log(title, content, startDate, endDate, account)
  return await instance.post(`/mail/invite?session=${session}`, {
    data: {
      title,
      content,
      startDate,
      endDate,
      account
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
