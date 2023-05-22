import React from 'react'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui'

function CalendarPage (): JSX.Element {
  const currentDate = '2018-11-01'
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    { startDate: '2018-11-02T12:00', endDate: '2018-11-02T13:30', title: 'Go to a gym' }
  ]
  return (
    <div className='absolute w-full h-[92%] flex justify-center items-center'>
      <Paper className='w-[80%] h-[70%]'>
        <Scheduler data={schedulerData}>
      <ViewState currentDate={currentDate}/>
      <WeekView startDayHour={9} endDayHour={14}/>
      <Appointments />
    </Scheduler>
  </Paper>
    </div>
  )
}

export default CalendarPage
