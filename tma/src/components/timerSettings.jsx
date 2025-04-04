import plus from './../icons/plus.png'
import minus from './../icons/minus.png'
import cancel from './../icons/cancel.png'
import './../utility/util.css'
import './../styles/timer.css'
import timerStore from '../stores/timerStore'


function TimerSetting(){

    const { openSetting, closeSettings, minutes_set_fun_add, minutes_set_fun_minus, minutes_set} = timerStore();

    function CloseSetting(){
        closeSettings()
    }

    function IncMin(){
        minutes_set_fun_add(minutes_set);
    }
    function DecMin(){
        minutes_set_fun_minus(minutes_set);
    }

    return(
        <div className='timerSetting flex flex-dir gap16 flex- pad16'>
            <div className='flex flex-1'>
                <h2 className='head2 head2__ headcenter'>Set <span>time</span></h2>
                <button onClick={CloseSetting} className='closeSettings'>
                    <img src={cancel} className='incIcon' alt='plus'/>
                    
                </button>
            </div>
            <hr/>
            <div className='flex flex-dir gap8'>
                <h2 className='head2 head2__ tset'>Minutes</h2>
                <div className='flex flex-2 gap32'>
                    <button onClick={DecMin} className='incBtn'>
                        <img src={minus} className='incIcon' alt='plus'/>
                    </button>
                    <h2 className='head2 head2__ bighead'><span>{minutes_set}</span></h2>
                    <button onClick={IncMin} className='incBtn'>
                        <img src={plus} className='incIcon' alt='plus'/>
                    </button>
                </div>
            </div>
            <hr/>
            <div className='flex flex-dir gap8'>
                <h2 className='head2 head2__ tset'>Seconds</h2>
                <div className='flex flex-2 gap32'>
                    <button className='incBtn'>
                        <img src={minus} className='incIcon' alt='plus'/>
                    </button>
                    <h2 className='head2 head2__ bighead'><span>59</span></h2>
                    <button className='incBtn'>
                        <img src={plus} className='incIcon' alt='plus'/>
                    </button>
                </div>
            </div>
            <hr/>
            <div className='flex flex-dir gap8'>
                <h2 className='head2 head2__ tset'>Break</h2>
                <div className='flex flex-2 gap32'>
                    <button className='incBtn'>
                        <img src={minus} className='incIcon' alt='plus'/>
                    </button>
                    <h2 className='head2 head2__ bighead'><span>05</span></h2>
                    <button className='incBtn'>
                        <img src={plus} className='incIcon' alt='plus'/>
                    </button>
                </div>
            </div>
            <hr/>
            <div className='flex flex-dir gap8'>
                <h2 className='head2 head2__ tset'>Big break</h2>
                <div className='flex flex-2 gap32'>
                    <button className='incBtn'>
                        <img src={minus} className='incIcon' alt='plus'/>
                    </button>
                    <h2 className='head2 head2__ bighead'><span>10</span></h2>
                    <button className='incBtn'>
                        <img src={plus} className='incIcon' alt='plus'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TimerSetting;