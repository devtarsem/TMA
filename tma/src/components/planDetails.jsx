import './../utility/util.css'
import './../styles/planDetail.css'
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import planDetailStore from '../stores/planDetailStore';
import cross from './../icons/cancel.png'

function PlanDetails(){

    const params = useParams();
    const {planToShow, assignPlan, deletePlanParticularSubject} = planDetailStore();
    useEffect(el=>{
        assignPlan(params);
    },[])

    function periorityBtached(periorityComing){
        if(periorityComing == 'Must do'){
            return 'MustDo';
        }else if(periorityComing == 'Moderatelly do'){
            return 'Moderatelly'
        }else if(periorityComing == 'Fun activity'){
            return 'fun'
        }else if(periorityComing == 'diversify'){
            return 'delegate'
        }
    }

    function deleteParticularSubjectFromPlan(event, id, name){
    
        deletePlanParticularSubject(id,name,params);
    }


    return(
        <div className="planDetails pad16 flex flex-dir gap16">
            {/* <Link to='/' className='pdslink'>Start PD's</Link> */}
            <div className='topplandetails flex flex-dir gap8'>
                <p className='plandet head2 head2__pro'>Plan name - <span>{planToShow[0]?.name }</span></p>
                <p className='plandet head2 head2__pro' >Plan number of subjects - <span>{planToShow[0]?.planSubs.length}</span></p>
            </div>
            <hr/>
            <div className='sliderDisplayOfplanitems  gap16'>
                {planToShow[0]?.planSubs.map(el=>
                    <div key={el.name} className=' plansubdetails flex flex-1 flex-dir gap8'>
                        <button onClick={(event)=> deleteParticularSubjectFromPlan(event, planToShow[0].id, el.name)} className='planInDelete'>
                            <img src={cross} alt='delete' className='del_icon'/>
                        </button>
                        <div className={`periorityBatch flex flex-2 ${periorityBtached(el.periority)}`}>
                            <p className='per'>{el.periority}</p>
                        </div>
                        <p className='sublan sublan__ whiteColor'>{el.name}</p>
                        <div className='flex flex-1 gap16'>
                            <p className='deadline whiteColor'>Deadline by - </p>
                            <div className='cover'>
                                <p className='deadline whiteColor'>{el.date}</p>
                                <p className='deadline whiteColor'>(YYYY-MM-DD)</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PlanDetails;