import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/events'


export const DeleteEventFab = () => {

    const dispatch = useDispatch()
    const handleOnClick = () =>{
        dispatch( eventDeleted() )
    }
    return (
        <div id='divbutton'>
            <button
                className = 'btn btn-danger fab-danger'
                onClick = { handleOnClick }
            >
                <i className='fas fa-trash'></i>
                <span> Borrar evento</span>

            </button>
        </div>
    )
}