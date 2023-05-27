import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import { ViewState, EditingState, IntegratedEditing, type ChangeSet } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton, ConfirmationDialog, AppointmentTooltip, AppointmentForm, EditRecurrenceMenu
} from '@devexpress/dx-react-scheduler-material-ui'
import appointment from '../components/today-appointments'

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
  const [schedulerData] = useState(appointment)
  function commitChanges ({ added }: ChangeSet): void {
    console.log(123)
    // let data = schedulerData
    // if (added != null) {
    //   const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
    //   data = [...data, { ...added, id: startingAddedId }]
    // }
    // setSchedulerData(data)
  }
  return (
    <div className='absolute w-full h-[92%] flex justify-center items-center'>
      <Paper className='w-[90%] h-[85%]'>
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
        </Scheduler>
      </Paper>
    </div>
  )
}

export default CalendarPage
