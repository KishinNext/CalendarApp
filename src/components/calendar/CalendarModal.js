import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { CalendarForm } from './CalendarForm';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveNote } from '../../actions/events';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')



export const CalendarModal = ({fecha, dateStart, dateEnd, formValues, onChangeDateStart, onChangeDateEnd, setFormValues}) => {
    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui) 
    const { activeEvent } = useSelector(state => state.calendar) 
    const init = {
      title: 'Evento',
      notes:'',
      start: fecha.toDate(),
      end: fecha.clone().add(1,'hours').toDate(),
      user:{
          _id:'123',
          name:'Jairo'
      }
    }
    useEffect(() => {
      if ( activeEvent ){
        setFormValues(activeEvent)
      }
      else {
        setFormValues(init)
      }
    }, [activeEvent])

    const closeModal = () =>{
      dispatch(uiCloseModal())
      dispatch(eventClearActiveNote())
      setFormValues(
        init
      )
    }


    const handleStartDateChange  = (e) =>{
      onChangeDateStart(e)
      setFormValues({
        ...formValues,
        start:e
      })
    }
    const handleEndtDateChange  = (e) =>{
      onChangeDateEnd(e)
      setFormValues({
        ...formValues,
        end:e
      })
    }


    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={200}
          className='modal'
          overlayClassName='modal-fondo'
        >
            <CalendarForm 
              dateStart = { dateStart }
              dateEnd = { dateEnd }
              onChangeDateStart = { handleStartDateChange }
              onChangeDateEnd =  { handleEndtDateChange }
              formValues = { formValues }
              setFormValues = { setFormValues }
              fecha = { fecha }
            ></CalendarForm>
        </Modal>
    )
}
