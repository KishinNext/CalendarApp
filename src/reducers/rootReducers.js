import {combineReducers} from 'redux'
import { calendarReducer } from './calendarReducer'
import { uiReducers } from './uiReducers'

export const rootReducer = combineReducers({
    ui: uiReducers,
    calendar: calendarReducer,
})