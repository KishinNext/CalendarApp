import React, { useState } from 'react'
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from '../../helpers/calendar-messages';
import 'moment/locale/es'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es')
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const events = [
            {
                title: 'Hola Mundo',
                start: moment().toDate(),
                end: moment().add(2, 'hour').toDate(),
                bgcolor: '#fafafa',
                user:{
                    _id:'123',
                    name:'Jairo'
                }
            }
        ]




export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    
    const onDoubleClick = (e) =>{
        console.log(e)
    }
    const onSelectEvent =(e)=>{
        console.log(e) 
    }
    const onViewChange=(e)=>{
        setLastView(e) 
        localStorage.setItem('lastView', e)
    }


    const eventSytleGetter = (even, start, end, isSelected)=>{
        const style = {
            backgroundColor:'#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onEventResize = (data) => {
        const { start, end } = data;
        events[0].start = start;
        events[0].end = end;
    
        return events;
    
      };
    
    const onEventDrop = (data) => {
        const { start, end } = data;
        events[0].start = start;
        events[0].end = end;
        return events;
    };
    
    return (
        <div className ='calendar-screen'>
            <Navbar></Navbar>

            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                eventPropGetter ={eventSytleGetter}
                messages = {messages}
                components={{event:CalendarEvent}}
                onDoubleClickEven={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                resizable
                selectable
                />

            <CalendarModal/>
        </div>
    )
}
