import './../utility/util.css'
import './../styles/pds.css'
import { Link } from 'react-router';
import pdStore from '../stores/pdStore';
import { useEffect } from 'react';
import play from './../icons/play.png'

function Pds(){
    
    const {subjects, settingUpCurrentPd,hours_pending, settingSubjectCmpleted,subsCompleted,sub_complete, ListOfSubjects, setUpTheList} = pdStore()
    useEffect(el=>{
        setUpTheList()
        settingSubjectCmpleted()
    }, [])

    function curentPD_Selection(event, element){
        settingUpCurrentPd(element)
    }
    
    return(
        <div className="pds pad16 flex flex-dir gap16">
            <div className='pdTop flex flex-1 pad16'>
                <h2 className='head2 head2__'>Subjects &mdash; <span>{ListOfSubjects?.length}</span></h2>
                {/* <h2 className='head2 head2__'>Hours pending &mdash; <span>5/10</span></h2> */}
            </div>
            <div className='progressBar pad16 flex flex-dir gap16'>
                <h2 className='head2 head2__'>Subjects completed &mdash; <span>{subsCompleted}</span></h2>
                <div className='flex flex-1 gap8'>
                    <div className='progressouter'>
                        <div className='progressinner'  style={{width: `${(subsCompleted/ListOfSubjects?.length)*100}%`, height : '100%', backgroundColor : 'var(--color-third)', borderRadius : '10rem'}} ></div>
                    </div>
                    <p className='progress__'>{(subsCompleted/ListOfSubjects?.length)*100}%</p>
                </div>
            </div>
            <div className='pdss flex flex-dir gap16'>
                {ListOfSubjects?.map(el=>
                    <Link onClick={(event)=> curentPD_Selection(event, el)} to='/current-pd' className='pdssele flex flex-dir gap8'>
                        <div className='flex flex-1 gap8'>
                            <img src={play} className='playIcon__' alt='play'/>
                            <p className='subpd'>{el.name}</p>
                            <p className='subpd'>hours &mdash; {el.hour}</p>
                            <p className='progress_'>progress - {el.hourCompleted == '' ? 0 : ((Number((el.hourCompleted/120))/Number(el.hour))*100).toFixed(2)}%</p>
                        </div>
                        <div className=' timeprogress_ '>
                            <div className=' outerbar___'  >
                                <div className=' innerbar__' style={{width: `${el.hourCompleted == '' ? 0 : ((Number((el.hourCompleted/120))/Number(el.hour))*100).toFixed(2)}%`, height : '100%', backgroundColor : 'var(--color-third)', borderRadius : '10rem'}}></div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Pds;