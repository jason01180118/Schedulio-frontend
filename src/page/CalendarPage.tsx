import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  DayView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui'

function CalendarPage (): JSX.Element {
  const currentDate = '2018-11-01'
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' }
  ]
  return (
    <div>
      <p className="text-5xl">hello world</p>
      <Link to="/">back</Link>
      <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <DayView
        startDayHour={9}
        endDayHour={14}
      />
      <Appointments />
    </Scheduler>
  </Paper>
    </div>
  )
}

export default CalendarPage
