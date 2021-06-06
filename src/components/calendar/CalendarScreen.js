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
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { eventClearActiveNote } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es')
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);




export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const fecha = moment().minutes(0).seconds(0).add(1,'hours')
    const [dateStart, onChangeDateStart] = useState(fecha.toDate());
    const [dateEnd, onChangeDateEnd] = useState(fecha.clone().add(1,'hours').toDate());
    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes:'',
        start: fecha.toDate(),
        end: fecha.clone().add(1,'hours').toDate(),
        user:{
            _id:'123',
            name:'Jairo'
        }
    })
  
    const dispatch = useDispatch()
    const {events, activeEvent} = useSelector(state => state.calendar)
    //lee los eventos

    const onDoubleClick = (e) =>{
        dispatch(uiOpenModal())
    }
    const onSelectEvent =(e)=>{
        dispatch(eventSetActive(e))
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
        dispatch(uiOpenModal())
      };
    
    const onEventDrop = (data) => {
        const { start, end } = data;
        dispatch(uiOpenModal())
    };
    

    const onSelect = (data) => {
        const { start, end } = data;
        onChangeDateStart(start)
        onChangeDateEnd(end)
        setFormValues({
            ...formValues,
            start: start,
            end: end
        })
        dispatch(uiOpenModal())
        dispatch(eventClearActiveNote())
    }

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
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelect}
                onView={onViewChange}
                view={lastView}
                resizable
                selectable
                />
            <AddNewFab></AddNewFab>
            {activeEvent && <DeleteEventFab></DeleteEventFab>}
            <CalendarModal
                dateStart= { dateStart }
                dateEnd = { dateEnd }
                formValues = { formValues }
                onChangeDateStart = { onChangeDateStart }
                onChangeDateEnd = { onChangeDateEnd }
                setFormValues = { setFormValues }
                fecha = { fecha }
            />
        
        </div>
    )
}

