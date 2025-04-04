import './../utility/util.css'
import './../styles/timer.css'
import play from './../icons/play.png'
import set from './../icons/setting.png'
import pause from './../icons/pause.png'
import TimerSetting from './timerSettings'

import { useEffect, useState , useRef} from 'react'
import timerStore from '../stores/timerStore'

function Timer(){
    const {currentPd, settingTimer,progressCal,settingUpCredsForTimer,progress,currentPDCaching, settingTimeSpend,hours_spended,openSetting, openingSettings, minutes_set, second_set} = timerStore();
    const [stopTimer, setStopTimer] = useState(false);
    const [playTimer, setPlayTimer] = useState(false);
    const [breaks, setBreaks] = useState(false);
    const [timercountSec, settimercountSec] = useState({minutes : 24, second :59});
    // const [openSetting, setOpenSetting] = useState(false)
    const timerRef = useRef(null);
    const [exceed, Setexceed] = useState(false);
    const [timercountSecExceed, settimercountSecExceed] = useState({minutesEx : 0, secondEx : 1});
    const [timercountBreak, settimercountBreak] = useState({minutesBreak : 4, secondBreak : 49});

    useEffect(el=>{
        currentPDCaching()
        console.log('pissed off')
        progressCal((JSON.parse(localStorage.getItem('curr_pd')).hour))
        settingUpCredsForTimer()

    }, [])

    function playTime() {
        setPlayTimer(playTimer => !playTimer);
        setBreaks(breaks=> false);
        if(timerRef.current) return;
        // if(timeBreakSeries){
        //     settimercountSec({minutes : 4, second : 59})

        // }else{
        //     settimercountSec({minutes : 1, second : 5})

        // }
        timerRef.current = setInterval(() => {
            settimercountSec(timercountSec=>{
                let {minutes, second} = timercountSec;


                if(minutes === 0 && second === 0){
                    clearInterval(timerRef.current);
                    const audio = new Audio('/music.mp3')
                    audio.play()
                    timerRef.current = setInterval(()=>{
                        settimercountSecExceed(timercountSecExceed=>{
                            let {minutesEx, secondEx} = timercountSecExceed;
                            
                            if(secondEx === 59){
                                settingTimeSpend(hours_spended)
                                progressCal((JSON.parse(localStorage.getItem('curr_pd')).hour))
                   
                                return {minutesEx : minutesEx+1, secondEx: 1}
                            }
                            return {minutesEx, secondEx: secondEx+1}
                        })
                    },1000)
                    return {minutes : 0, second : 0};
                }
                
                
                if(second === 0){
                    console.log('passed')
                    settingTimeSpend(hours_spended)
                    progressCal((JSON.parse(localStorage.getItem('curr_pd')).hour))
                    return {minutes : minutes - 1, second : 59};
                }
                return {minutes : minutes,second : second-1}
            })
        }, 1000);
    }

    function stopTimerfun(){
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null; // Reset interval ID
            setPlayTimer(playTimer => !playTimer); // Update state to reflect paused timer
            const audio = new Audio('/music.mp3')
            audio.play()
        }
    }

    function breakSetup(){
        clearInterval(timerRef.current);
        setBreaks(breaks=> true); 

        timerRef.current = setInterval(() => {
            settimercountBreak(timercountBreak=>{
                let {minutesBreak, secondBreak} = timercountBreak;

                if(minutesBreak === 0 && secondBreak === 0){
                    clearInterval(timerRef.current);
                    const audio = new Audio('/music.mp3')
                    audio.play()
                    return {minutesBreak : 0, secondBreak : 0};
                }
                
                if(secondBreak === 0){
                    console.log('passed')
                    // settingTimeSpend(hours_spended)
                    // progressCal((JSON.parse(localStorage.getItem('curr_pd')).hour))
                    return {minutesBreak : minutesBreak - 1, secondBreak : 59};
                }
                return {minutesBreak : minutesBreak,secondBreak : secondBreak-1}
            })
        }, 1000); 
    }

    function stopBreak(){
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null; // Reset interval ID
            setPlayTimer(playTimer => !playTimer); // Update state to reflect paused timer
            const audio = new Audio('/music.mp3')
            audio.play()
        }
        setBreaks(breaks=> false);
    }



    function SettingStatus(){
        openingSettings()
    }

    function increByFive(){
        if(breaks){
            settimercountBreak({minutesBreak : timercountBreak.minutesBreak+5, secondBreak : 59})
        }else{

            settimercountSec({minutes : timercountSec.minutes+5, second : 59})
        }
    }
    

    return(
        <div className="timer pad16 flex flex-dir gap16">
            {/* <button onClick={setest} className='shift'>test</button> */}
            <div className='timerTop flex flex-1 pad16'>
                <h2 className='head2 head2__'>Subject &mdash; <span>{currentPd.name}</span></h2>
                <h2 className='head2 head2__'>Hours &mdash; <span>{currentPd.hour}hr</span></h2>
            </div>
            <div className='timerProgress pad16 flex flex-dir gap8'>
                <h2 className='head2 head2__'>Progress &mdash; <span>{Number(progress).toFixed(2)}%</span></h2>
                <div className='outerbar'  >
                    <div className='innerBar' style={{width: `${progress}%`, height : '100%', backgroundColor : 'var(--color-third)', borderRadius : '10rem'}}></div>
                </div>
            </div>
            <div className='timerTimer flex flex-2 flex flex-dir flex-2 gap16'>
                {/* {openSetting &&
                    <TimerSetting/>
                } */}

                <div className='extraAdds flex gap16 pad16'>
                    <button onClick={increByFive} className='add5moreMin'> +5 minutes</button>
                </div>

                {!playTimer &&
                    <>
                        {breaks ?
                            <button onClick={stopBreak} className='takeBreakbtn'>Stop</button>
                        :
                            <button onClick={breakSetup} className='takeBreakbtn'>Break</button>
                        }
                    </>
                }
                {/* <button onClick={SettingStatus} className='settingBtn'>
                    <img src={set} className='setIcon' alt='play'/>
                </button> */}

                <div className='outer flex flex-2'>
                    <div className='inner flex flex-2 flex-dir '>
                        {/* <p className='tag'>Work for</p> */}
                        {breaks ?
                            <p className='countTime'>Break<br/><span>{timercountBreak.minutesBreak}:{timercountBreak.secondBreak}</span></p>
                        :
                            <>
                                <p className=' count__overload'>Over work for<br/> <span>+{timercountSecExceed.minutesEx}:{timercountSecExceed.secondEx}</span></p>
                                <p className='countTime'>Work for<br/><span>{timercountSec.minutes}:{timercountSec.second}</span></p>
                            </>
                        }
                    </div>
                </div>
                <div className='play_pause'>
                    {!breaks &&
                        <>
                            {playTimer ?
                                <button onClick={stopTimerfun} className='playBtn'>
                                <img src={pause} className='playIcon' alt='play'/>
                                </button>
                                :
                                <button onClick={playTime} className='playBtn'>
                                    <img src={play} className='playIcon' alt='play'/>
                                </button>
                            }
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Timer;