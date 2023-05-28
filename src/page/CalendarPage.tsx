import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton, AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui'
import { getCalendar, sendInvite } from '../server/axios'
import { useCookies } from 'react-cookie'
import { Navigate, useParams } from 'react-router-dom'

function CalendarPage (): JSX.Element {
  const [schedulerData, setSchedulerData]: any[] = useState([])
  const [cookies] = useCookies(['session'])
  const { account } = useParams()
  useEffect(() => {
    getCalendar(cookies.session, account === undefined ? '' : account).then((res) => {
      console.log(res.data)
      let buffer: any[] = []
      Object.values(res.data).forEach((value) => {
        console.log(value)
        buffer = buffer.concat(value)
      })
      setSchedulerData(buffer)
    }).catch((err) => { console.log(err) })
  }, [])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as typeof e.target & {
      title: { value: string }
      content: { value: string }
      startDate: { value: string }
      endDate: { value: string }
    }
    if (account !== undefined) {
      sendInvite(cookies.session, target.title.value, target.content.value, target.startDate.value, target.endDate.value, account).catch((err) => { console.log(err) })
    }
  }
  useEffect(() => {
    console.log(schedulerData)
    schedulerData.forEach((element: { startDate: string | Date, endDate: string | Date }) => {
      element.startDate = new Date(element.startDate)
      element.endDate = new Date(element.endDate)
    })
  }, [schedulerData])
  if (cookies.session === undefined) {
    return <Navigate to='/login' />
  } else {
    return (
      <div className='absolute w-full h-[92%] flex flex-col items-center overflow-y-scroll'>
        <p className='fontsize-bigtitle text-black font-Alata mb-4 text-left'>{account === undefined ? 'My' : account} Calendar</p>
        <Paper className='w-[90%] h-[80%]'>
          <Scheduler data={schedulerData}>
            <ViewState/>
            <WeekView startDayHour={9} endDayHour={24}/>
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AllDayPanel />
          </Scheduler>
        </Paper>
        {
         account === undefined
         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
           ? <a className='my-3 w-[6%] h-[5%] fontsize-content font-Alata flex justify-center items-center bg-blue-300 rounded-3xl shadow-lg' href={`${process.env.REACT_APP_API_URL}/add_email?session=${cookies.session}`}>+add</a>
           : <></>
        }
        {
          account !== undefined
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            ? <form className='absolute top-[80%] w-full h-full flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <p className='absolute top-[12%] left-[5%] fontsize-bigtitle font-Alata flex'>Send Your Reservation</p>
                <div className='absolute top-[20%] w-[90%] h-[70%] flex flex-col justify-start items-center bg-white bg-opacity-80 rounded-3xl'>
                  <div className='absolute top-[10%] my-4 w-[90%] h-[70%] flex flex-col justify-start items-start'>
                  <div className='flex flex-vol w-full'>
                  <div className='w-[25%]'>
                  <label className='fontsize-content font-Alata mb-6' htmlFor='title'>Title</label>
                  </div>
                  <input className='fontsize-content font-Alata mb-6 w-full h-[90%] mx-6 flex justify-center items-center bg-white' name='title' type='text'></input>
                  </div>
                  <div className='flex flex-vol w-full'>
                  <div className='w-[20%]'>
                  <label className='fontsize-content font-Alata mb-6' htmlFor='title'>Start Time</label>
                  </div>
                  <input className='fontsize-content font-Alata mb-6 w-[80%] h-[90%] mx-6 flex justify-center items-center bg-white' name='startDate'></input>
                  </div>
                  <div className='flex flex-vol w-full'>
                  <div className='w-[20%]'>
                  <label className='fontsize-content font-Alata mb-6' htmlFor='title'>End Time</label>
                  </div>
                  <input className='fontsize-content font-Alata mb-6 w-[80%] h-[90%] mx-6 flex justify-center items-center bg-white' name='endDate'></input>
                  </div>
                  <label className='fontsize-content font-Alata mb-6 w-full' htmlFor='content'>Describtion</label>
                  <textarea className='fontsize-content font-Alata mb-6 left-full mb-4 w-[95%] h-full mx-10 justify-start items-start bg-white' name='content'></textarea>
                  <input className='fontsize-title font-Alata mb-6 w-full h-[20%] flex justify-center items-center underline' type='submit' value="Send Reservation"></input>
                  </div>
                </div>
            </form>
            : <></>
        }

      </div>
    )
  }
}

export default CalendarPage
