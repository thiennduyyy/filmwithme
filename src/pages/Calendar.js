import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import '../styles/Calendar.css'

const localizer = momentLocalizer(moment) 

const eventData = [
    {
        id: 1,
        title: 'Class',
        location: 'Dhaka, Bangladesh',
        type: 'event',
        start: new Date(2023, 6, 23, 9, 0, 0),
        end: new Date(2023, 6, 23, 13, 0, 0)
    },
    {
        id: 2,
        title: 'event',
        location: 'Rajshahi, Bangladesh',
        type: 'event',
        start: new Date(2023, 5, 15, 9, 0, 0),
        end: new Date(2023, 5, 15, 13, 0, 0)
    },
    {
        id: 3,
        title: 'Event',
        location: 'Coxbazar, Bangladesh',
        type: 'event',
        start: new Date(2023, 6, 30, 8, 30, 0),
        end: new Date(2023, 6, 30, 12, 30, 0)
    },
    {
        id: 4,
        title: "class",
        location: 'Dhanmondi, Dhaka',
        type: 'class',
        start: new Date(2023, 6, 2, 8, 30, 0),
        end: new Date(2023, 6, 2, 12, 30, 0)
    },
    {
        id: 5,
        title: "class",
        location: 'Dhanmondi, Dhaka',
        type: 'class',
        start: new Date(2023, 7, 23, 10, 30, 0),
        end: new Date(2023, 7, 23, 14, 30, 0)
    },
    {
        id: 6,
        title: "Event",
        location: 'BRVT, VT',
        type: 'event',
        start: new Date(2023, 7, 23, 10, 30, 0),
        end: new Date(2023, 7, 23, 14, 30, 0)
    },
    {
        id: 7,
        title: "event",
        location: 'Dhanmondi, Dhaka',
        type: 'event',
        start: new Date(2023, 7, 6, 10, 30, 0),
        end: new Date(2023, 7, 6, 14, 30, 0)
    },
    {
        id: 8,
        title: "event",
        location: 'Dhanmondi, Dhaka',
        type: 'event',
        start: new Date(2023, 7, 6, 8, 30, 0),
        end: new Date(2023, 7, 6, 12, 30, 0)
    }
]

function DayCellContent(props) {
    const { date, label } = props

    const isNotOffrange = moment().isSameOrBefore(date, 'day')
    const isToday = moment().isSame(date, 'day')
    // const isInCurrentMonth = moment().isSame(date, 'month')
    // if (!isInCurrentMonth) {
    //     return null
    // }
    if (!isNotOffrange) {
        return <div style={{color: "rgba(0,0,0, .25)"}}>{label}</div>
    }

    return (
        <div style={{color: `${isToday ? 'blue' : 'black'} !important`}}>
            {label}
        </div>
    )
}

const eventStyleGetter = (props) => {
    const { type, end } = props || {}
    const isOffrange = moment().isAfter(moment(end))
    // const isInCurrentMonth = moment().isSame(end, 'month')
    let style
    if (type === 'class') {
        style = {
            backgroundColor: `rgba(255, 0, 0, 0.1)`,
            borderLeft: `5px solid red`,
            opacity: isOffrange ? 0.3 : 1
        }
    } else if (type === 'event') {
        style = {
            backgroundColor: `rgba(49,116,173, 0.1)`,
            borderLeft: `5px solid #3174ad`,
            opacity: isOffrange ? 0.3 : 1
        }
    } else {
        style = {}
    }
    return {
        style
    }
}


export default function CustomCalendar() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', marginTop: '150px', width: '60%'}}>
        <Calendar 
            localizer={localizer}
            events={eventData}
            // defaultView={Views.MONTH}
            // views={['month']}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, flex: 2 }}
            components={{
            // toolbar: ToolBarInstance,
            month: {
                    dateHeader: DayCellContent
                }
            }}
            eventPropGetter={eventStyleGetter}
        />
    </div>
  )
}