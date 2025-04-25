import './../utility/util.css'
import './../styles/calender.css'
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles
import calenderStore from '../stores/calenderStore';
import { createRef } from 'react';
import close from './../icons/cross.png'

export default function Calender(){

    const [dateSel, setDate] = useState('');
    const handleDateClick = (value) => {
        console.log(value.toLocaleDateString());
        setDate(value.toLocaleDateString())
        const dates = value.toLocaleDateString().split('/')[1] + "/" + value.toLocaleDateString().split('/')[0] + "/" + value.toLocaleDateString().split('/')[2]

        fetchExisitngEvents(dates)
    };

    const time = createRef();
    const name = createRef();


    const {displayNewEventPanel,deleteASpecificEvent, resetEventAddedStatus, fetchExisitngEvents, alreadyExistingEvents,openNewEventAddPanel, eventAddedSuccessfully,closeNewEventAddPanel, AddNewEvent} = calenderStore();
    console.log(alreadyExistingEvents)
    function openNewEventCont(){
        openNewEventAddPanel()
    }

    function closeNewEventCont(){
        closeNewEventAddPanel()
        const dates = dateSel.toLocaleDateString().split('/')[1] + "/" + dateSel.toLocaleDateString().split('/')[0] + "/" + dateSel.toLocaleDateString().split('/')[2]

        fetchExisitngEvents(dates)
    }

    function setNewEvent(el){
        el.preventDefault();
        const timeSel = time.current.value;
        const nameSel = name.current.value;
        const dates = dateSel.toLocaleDateString().split('/')[1] + "/" + dateSel.toLocaleDateString().split('/')[0] + "/" + dateSel.toLocaleDateString().split('/')[2]
        AddNewEvent(dates,timeSel, nameSel);
        time.current.value = ''
        name.current.value = ''
    }

    function addMoreEventsBtnReseter(el){
        el.preventDefault();
        resetEventAddedStatus();
    }
    function deleteEvent(event, el){
        const dates = dateSel.toLocaleDateString().split('/')[1] + "/" + dateSel.toLocaleDateString().split('/')[0] + "/" + dateSel.toLocaleDateString().split('/')[2]

        deleteASpecificEvent(dates,el.name)
    }

    return(
        <div className="cal pad16 flex flex-dir gap16">
            <h2 className='head2'>Schedule your events</h2>
            <Calendar
                onChange={setDate}
                className="styled-calendar"
                value={dateSel}
                onClickDay={handleDateClick} // Event handler for clicking on a day
            />
            <div className='btns flex flex-1 gap16'>
                <button onClick={openNewEventCont} className='btnSchedule'>Schedule new eveny</button>
                <button onClick={closeNewEventCont} className='btnSchedule'>Existing events</button>
            </div>
            <div className='schedulpanel flex flex-dir gap16'>
                <h2 className='head2'>Selected date - {dateSel ? dateSel.toLocaleDateString().split('/')[1] + "/" + dateSel.toLocaleDateString().split('/')[0] + "/" + dateSel.toLocaleDateString().split('/')[2]: 'No date selected'}</h2>
                {displayNewEventPanel &&
                    <div className='newScheduleEvent'>
                        <form className='formSchedule flex flex-dir gap16'>
                            <div className='formEle flex flex-dir gap8'>
                                <label className='time'>Timing of event</label>
                                <input ref={time} className='inp__' placeholder='time' type='time'/>
                            </div>
                            <div className='formEle flex flex-dir gap8'>
                                <label className='time'>Name of event</label>
                                <input ref={name} className='inp__' placeholder='Meeting with company hr' type='text'/>
                            </div>
                            {eventAddedSuccessfully ?
                                <button onClick={addMoreEventsBtnReseter} className='addEvent'>Event added &mdash; Add more</button>
                            
                            :
                            
                                <button onClick={setNewEvent} className='addEvent'>Add Event +</button>
                            }
                        </form>
                    </div>
                }

                {!displayNewEventPanel &&
                    <div className='fetchExitingEvents flex flex-dir gap16'>
                        {alreadyExistingEvents[0]?.eventsScheduled.map(el=>
                            <div className='eve flex flex-dir gap8 pad8'>
                                <p className='nameevent'>Time of event : - <span>{el.time}</span></p>
                                <p className='nameevent'>Event : -  <span>{el.name}</span></p>
                                <button onClick={(event)=>deleteEvent(event,el)} className='deleteUcon'>
                                    <img src={close} className='closebtnIcon' alt='close'/>
                                </button>
                            
                            </div>
                        )}
                    </div>
                }
            
            </div>
        </div>
    )
}