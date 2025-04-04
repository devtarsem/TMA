import './../utility/util.css'
import './../utility/media.css'

import './../styles/dashboard.css'
import Menu from './menu';
import bell from './../icons/bell.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import dashBoardStore from '../stores/dashboard';
import { createRef, useRef } from 'react';
import DateToLabels from './../classes/dateToLabelDate'
import logo from './../icons/logo.jpg'

function Dashboard(){

    const [daysDisplay, setDaysDisplay] = useState([])
    const {setTrackers, trackersData, resetTracker,checkingYesterdayWorkedOrNot,cachingTheConsistencyTracker,consistency_track,trackingConsistency} = dashBoardStore();
    const [trackerDisplay ,setTrackerDisplay] = useState(true);
    const calenderRef = useRef(null);
    const today = new Date(2025,4,21).getDate(); // Aaj ka din
    const [dateToday, setDateToday] = useState('');

    useEffect(el=>{
        checkingYesterdayWorkedOrNot()
        trackingConsistency();
        if(localStorage.getItem('home_trackers')){
            setTrackerDisplay(trackerDisplay=> false);

        }
        cachingTheConsistencyTracker()
        let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
        console.log(date)
        const modifydate = new DateToLabels()
        modifydate.date = date
        setDateToday(dateToday=> modifydate.converstion())

    }, [])

    

    const hourSelect = createRef()
    const daySelect = createRef()


    let month = new Date().getMonth();
    let date = new Date(2025, month, 1);
    useEffect(el=>{
        let days = [];
        const fixmonth = date.getMonth()
        while(date.getMonth() === fixmonth){
            days.push({
                date: date.getDate(),
                day: date.toLocaleDateString('en-US', { weekday: 'long' })
            });
            date.setDate(date.getDate() + 1);
        }
        setDaysDisplay(daysDisplay=> days)
    }, [])

    function setTrackersFun(){
        setTrackerDisplay(trackerDisplay=> !trackerDisplay);
        setTrackers(daySelect.current.value, hourSelect.current.value);
    }

    function resetTrackerfun(){
        resetTracker()
        setTrackerDisplay(trackerDisplay=> true);

    }

    return(
        <div className='dashboard'>
            <div className='top pad16'>
                <div className='flex flex-1'>
                    <h3 className='head_third'>Hello <span>ji</span>, <br/> happy productive day.</h3>
                    <div className='flex flex-2 gap16'>
                        {/* <p className='learn'>click to learn &rarr;</p> */}
                        <img src={logo} className='logo_icon' alt='notifications'/>
                    </div>
                </div>
            </div>
            <div className='calender pad16 flex flex-dir gap16'>
                <h2 className='head2'>Make your day <span>super productive</span>.</h2>
                <p className='dateToday'>Today is &mdash; <span>{dateToday.replace('-', '')}</span></p>
                {/* <div ref={calenderRef} className='cal flex gap16'>
                    {daysDisplay.map(el=>
                        <div  key={el.date} className={new Date().getDate() == el.date ? 'days days_curr flex flex-dir flex-1 gap8' : 'days flex flex-dir flex-1 gap8'}>
                            <p>{el.date}</p>
                            <p>{el.day.slice(0,3)}</p>
                        </div>
                    )}
                </div> */}
            </div>

            <div className='trackers pad16 flex flex-dir gap16'>
                <h2 className='head2'>Meet your trackers <span>Habbi</span>.</h2>
                {trackerDisplay &&
                    <div className='tracker_panel pad16 flex flex-dir gap16'>
                        <h2 className='head2 head2__'>Set your goals <span>hours</span> and <span>consistency</span>.</h2>
                        <div className='flex flex-dir gap16'>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>How much you want to study to count as consistent day</label>
                                <select ref={hourSelect} className='inp__'>
                                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(el=>
                                        <option className='opt' val={el}>{el} hours</option>
                                    )}
                                </select>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>How much days a week you want to be consistent</label>
                                <select ref={daySelect} className='inp__'>
                                    {[1,2,3,4,5,6,7].map(el=>
                                        <option className='opt' val={el}>{el} day</option>
                                    )}
                                </select>
                            </div>
                            <button onClick={setTrackersFun} className='settrackers'>Set Trackers</button>
                        </div>
                    </div>
                }

                {!trackerDisplay &&
                    <div className='trackChecks  flex flex-dir gap16'>
                        <div className='consistent pad16 flex flex-dir gap16'>
                            <button onClick={resetTrackerfun} className='resettracker'>Reset</button>
                            <p className='trackerName'>Habbi</p>
                            <div className='flex flex-dir '>
                                <h2 className='head_tracker'>Track consistency</h2>
                                <p className='des_track'>We you cross your desire hours a day it will mark as consistence day</p>
                            </div>
                            <div className='dots grid grid-7-col gap8'>
                                {consistency_track.map((el,index)=>
                                    <div className={el.mark===true ? 'trackdo trackdoFill flex flex-2':'trackdo flex flex-2'}>
                                        <p className='num'>{index+1}</p>
                                    </div>
                                )}
                            </div>
                            {consistency_track?.length === 0 &&
                                <p className='trackcall'>&rarr; Tracker will update once you start become consistent</p>
                            }
                        </div>


                        {/* this is second tracker to be made in future */}
                        {/* <div className='hourgoal pad16 flex flex-dir gap16'>
                            <p className='trackerName2'>daizy</p>

                            <div className='flex flex-dir '>
                                <h2 className='head_tracker'>Track hours goal</h2>
                                <p className='des_track'>your goal is tracked from last 7 working days.</p>
                            </div>
                            <div className='dots flex flex-dir gap8'>
                                <h2 className='head_tracker__'>Hours completed : - 72 hours</h2>
                                <div className='outerlab'>
                                    <div className='innerlab'></div>
                                </div>
                            </div>
                        </div> */}
                        <div className='hourgoal pad16 flex flex-dir gap16'>
                            <div className='flex flex-dir '>
                                <h2 className='head_tracker'>How to be <span>super productive</span></h2>
                            </div>
                            <div className='dots grid grid-3-col gap16'>
                                {["Plan for week", "Make Todo", "Start PD's", "Take notes", "See analytics", "Chill! repeat"].map(el=>
                                    <div className='step pad8 flex flex-2'>
                                        <p className='stepvalue'>{el}</p>
                                    </div>
                                )}
                                
                            </div>
                        </div>

                    </div>
                }
            </div>
            
            
            <div className='menu__ pad8'>
                <Menu/>
            </div>
        </div>
    )
}

export default Dashboard;