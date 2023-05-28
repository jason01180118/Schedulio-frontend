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
import { getCalendar, sendInvite } from '../server/aixos'
import { useCookies } from 'react-cookie'
import { Navigate, useParams } from 'react-router-dom'
import { MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

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
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
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
    }
    if (account !== undefined) {
      sendInvite(cookies.session, target.title.value, target.content.value, startDate, endDate, account).catch((err) => { console.log(err) })
    }
  }
  const handleStartDate = (_date: Date | null): void => {
    if (_date != null) {
      setStartDate(_date)
    }
  }
  const handleEndDate = (_date: Date | null): void => {
    if (_date != null) {
      setEndDate(_date)
    }
  }
  useEffect(() => {
    console.log(schedulerData)
    schedulerData.forEach((element: { startDate: string | Date, endDate: string | Date }) => {
      element.startDate = new Date(element.startDate)
      element.endDate = new Date(element.endDate)
    })
  }, [schedulerData])
  useEffect(() => { console.log(startDate, endDate) }, [startDate])
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
           ? <a className='my-3 w-[6%] h-[5%] fontsize-content font-Alata flex justify-center items-center bg-blue-300 rounded-3xl shadow-lg' href={`http://127.0.0.1:8000/add_email?session=${cookies.session}`}>+add</a>
           : <></>
        }
        {
          account !== undefined
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            ? <form className='absolute top-[88%] my-3 w-full h-[80%] flex flex-col justify-center items-center overflow-y-scroll' onSubmit={handleSubmit}>
              <p className='fontsize-title font-Alata mb-1'>invite</p>
              <label className='fontsize-content font-Alata mb-1' htmlFor='title'>title</label>
              <input className='fontsize-content font-Alata mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='title' type='text'></input>
              <label className='fontsize-content font-Alata mb-1' htmlFor='content'>content</label>
              <textarea className='fontsize-content font-Alata mb-4 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='content'></textarea>
              <input className='fontsize-title font-Alata mb-2 w-[10%] h-[5%] mx-12 flex justify-center items-center bg-green-200 rounded-3xl shadow-md' type='submit' value="Sign In"></input>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker label={'"year"'} value={startDate} onChange={handleStartDate} openTo="year" />
                <MobileDateTimePicker label={'"year"'} value={endDate} onChange={handleEndDate} openTo="year" />
              </LocalizationProvider>
            </form>
            : <></>
        }

      </div>
    )
  }
}

export default CalendarPage
