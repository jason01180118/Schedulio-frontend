import React from 'react'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'

function CalendarPage (): JSX.Element {
  const schedulerData = [
    { startDate: '2023-05-23T09:45', endDate: '2023-05-23T11:00', title: 'Meeting' },
    { startDate: '2023-05-23T12:00', endDate: '2023-05-23T13:30', title: 'Go to a gym' },
    { startDate: '2023-05-24T12:00', endDate: '2023-05-24T13:30', title: 'Go to a gym' }
  ]

  return (
    <div className='absolute w-full h-[92%] flex justify-center items-center'>
      <Paper className='w-[80%] h-[70%]'>
        <Scheduler data={schedulerData}>
          <ViewState defaultCurrentDate={new Date()}/>
          <WeekView startDayHour={9} endDayHour={24}/>
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />

        </Scheduler>
      </Paper>
    </div>
  )
}

export default CalendarPage
