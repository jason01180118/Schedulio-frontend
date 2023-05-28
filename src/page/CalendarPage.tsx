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
import { getCalendar } from '../server/aixos'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

// export interface ChangeSet {

//   added?: {
//     startDate: string
//     endDate: string
//     title: string
//   };
//   /** An associative array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID. */
//   changed?: {
//     [key: string]: any;
//   };
//   /** An array of IDs representing rows to be deleted. */
//   deleted?: number | string;
// }

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

  }
  useEffect(() => {
    console.log(schedulerData)
    schedulerData.forEach((element: { startDate: string | Date, endDate: string | Date }) => {
      element.startDate = new Date(element.startDate)
      element.endDate = new Date(element.endDate)
    })
  }, [schedulerData])
  return (
    <div className='absolute top-[15%] w-full h-[92%] flex flex-col items-center overflow-y-scroll'>
      <p className='fontsize-bigtitle text-black left-[5%] font-Alata mb-4 text-left'>{account === undefined ? 'My' : account} Calendar</p>
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
      cookies.session !== undefined && account === undefined
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        ? <a className='my-3 w-[6%] h-[5%] fontsize-content font-Alata flex justify-center items-center bg-blue-300 rounded-3xl shadow-lg' href={`http://127.0.0.1:8000/add_email?session=${cookies.session}`}>+add</a>
        : <></>
      }
      {
      cookies.session !== undefined && account !== undefined
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        ? <form className='absolute top-[80%] w-full h-full flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <p className='absolute top-[12%] left-[5%] fontsize-bigtitle font-Alata flex'>Send Your Reservation</p>
            <div className='absolute top-[20%] w-[90%] h-[55%] flex flex-col justify-start items-center bg-white bg-opacity-80 rounded-3xl'>
              <div className='absolute top-[20%] my-4 w-[90%] h-[70%] flex flex-col justify-start items-start'>
              <div className='flex flex-vol w-full'>
              <label className='fontsize-content font-Alata mb-4' htmlFor='title'>Title</label>
              <input className='fontsize-content font-Alata mb-4 w-full h-[90%] mx-6 flex justify-center items-center bg-white' name='title' type='text'></input>
              </div>
              <div className='flex flex-vol w-full'>
              <label className='fontsize-content font-Alata mb-4' htmlFor='title'>Start Time</label>
              </div>
              <div className='flex flex-vol w-full'>
              <label className='fontsize-content font-Alata mb-4' htmlFor='title'>End Time</label>
              </div>
              <label className='fontsize-content font-Alata mb-4 w-full' htmlFor='content'>Describtion</label>
              <textarea className='fontsize-content font-Alata mb-4 left-full mb-4 w-[95%] h-full mx-10 justify-start items-start bg-white' name='content'></textarea>
              <input className='fontsize-title font-Alata mb-4 w-full h-[20%] flex justify-center items-center underline' type='submit' value="Send Reservation"></input>
              </div>
            </div>
          </form>
        : <></>
      }
    </div>
  )
}

export default CalendarPage
