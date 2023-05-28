import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { ViewState, EditingState, IntegratedEditing, type ChangeSet } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton, ConfirmationDialog, AppointmentTooltip, AppointmentForm, EditRecurrenceMenu, AllDayPanel
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
  function commitChanges ({ added }: ChangeSet): void {
    // let data = schedulerData
    // if (added != null) {
    //   const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
    //   data = [...data, { ...added, id: startingAddedId }]
    // }
    // setSchedulerData(data)
  }
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
  useEffect(() => {
    console.log(schedulerData)
    schedulerData.forEach((element: { startDate: string | Date, endDate: string | Date }) => {
      element.startDate = new Date(element.startDate)
      element.endDate = new Date(element.endDate)
    })
  }, [schedulerData])
  return (
    <div className='absolute w-full h-[92%] flex flex-col justify-center items-center'>
      <p className='fontsize-bigtitle text-black font-Alata mb-4 text-left'>My Calendar</p>
      <Paper className='w-[90%] h-[80%]'>
        <Scheduler data={schedulerData}>
          <ViewState/>
          <EditingState
            onCommitChanges={commitChanges}
          />
          <IntegratedEditing />
          <EditRecurrenceMenu />
          <WeekView startDayHour={9} endDayHour={24}/>
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <ConfirmationDialog />
          <AppointmentTooltip
          />
          <AppointmentForm readOnly/>
          <AllDayPanel />
        </Scheduler>
      </Paper>
    </div>
  )
}

export default CalendarPage
