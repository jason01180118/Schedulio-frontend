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
      cookies.session !== undefined && account === undefined
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        ? <a className='my-3 w-[6%] h-[5%] fontsize-content font-Alata flex justify-center items-center bg-blue-300 rounded-3xl shadow-lg' href={`http://127.0.0.1:8000/add_email?session=${cookies.session}`}>+add</a>
        : <></>
      }
      {
      cookies.session !== undefined && account !== undefined
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        ? <form className='absolute top-[88%] my-3 w-full h-[80%] flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <p className='fontsize-title font-Alata mb-1'>invite</p>
            <label className='fontsize-content font-Alata mb-1' htmlFor='title'>title</label>
            <input className='fontsize-content font-Alata mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='title' type='text'></input>
            <label className='fontsize-content font-Alata mb-1' htmlFor='content'>content</label>
            <textarea className='fontsize-content font-Alata mb-4 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='content'></textarea>
            <input className='fontsize-title font-Alata mb-2 w-[10%] h-[5%] mx-12 flex justify-center items-center bg-green-200 rounded-3xl shadow-md' type='submit' value="Sign In"></input>
          </form>
        : <></>
      }
    </div>
  )
}

export default CalendarPage
