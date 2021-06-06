import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { eventAddNew, eventUpdated } from '../../actions/events';
import { uiCloseModal } from '../../actions/ui';


export const CalendarForm = (props) => {
    const dispatch = useDispatch()
    const { activeEvent } = useSelector(state => state.calendar)
    const {notes, title, start, end} = props.formValues;
    const [titleValid, setTitleValid] = useState(true)
    const handleInputChane = ({target}) =>{
        props.setFormValues({
            ...props.formValues,
            [target.name]: target.value
        })
    }
    const handleSumbintForm = (e) =>{
        e.preventDefault()
        
        let momnetStart = moment(start)
        let momnetEnd = moment(end)
        if (momnetStart.isSameOrAfter(momnetEnd)){
            Swal.fire(
                'Error',
                'La Fecha fin debe de ser mayor que la fecha de inicio',
                'question'
              )
        }
        if(title.trim().lenght<2){
            return setTitleValid(false)
        }
        //TODO REALIZAR BACKEND
        if ( activeEvent ){
            dispatch(eventUpdated(props.formValues))
        }
        else{
            dispatch(eventAddNew({
                ...props.formValues,
                id: new Date().getTime()
            }))
        }
        

        dispatch(uiCloseModal())

        props.setFormValues(
            {
              title: 'Evento',
              notes:'',
              start: props.fecha.toDate(),
              end: props.fecha.clone().add(1,'hours').toDate(),
              user:{
                  _id:'123',
                  name:'Jairo'
              }
            }
        )
    }
    return (
        <div>
            <h1> { !activeEvent ? 'Nuevo evento' : 'Editar evento'} </h1>
            <hr />
            <form 
                onSubmit={handleSumbintForm}
                className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={props.onChangeDateStart}
                        value={props.dateStart}
                        className ='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={props.onChangeDateEnd}
                        value={props.dateEnd}
                        className ='form-control'
                        minDate = { props.dateStart }
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className= {`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value = {title}
                        onChange = {handleInputChane}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value = {notes}
                        onChange = {handleInputChane}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </div>
    )
}
