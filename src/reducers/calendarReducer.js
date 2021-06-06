import moment from "moment";
import { types } from "../types/types";


const initialSate = {
    events:[
        {
            id: new Date().getTime(),
            title: 'Hola Mundo',
            start: moment().toDate(),
            end: moment().add(2, 'hour').toDate(),
            bgcolor: '#fafafa',
            user:{
                _id:'123',
                name:'Jairo'
            }
        }
    ],
    activeEvent: null
}

export const calendarReducer = (state = initialSate, action) =>{
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent : action.payload 
            }
        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events ,
                    action.payload
                ]
            }
        case types.eventClearActiveNote:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdateActiveNote:
            return{
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.activeEvent.id) 
                ),
                activeEvent: null
            }
        default:
            return state;
    }
}