import './../utility/util.css'
import './../styles/plan.css'
import add from './../icons/add.png'
import { useState , createRef, useEffect} from 'react';
import Menu from './menu';
import cross from './../icons/cancel.png'
import noNotes from './../icons/noNotes.png'
import cross1 from './../icons/cross.png'
import Swal from 'sweetalert2'
import planStore from '../stores/planStore';
import { Link } from 'react-router';
import errorDisplay from '../classes/errorDisplay';
import planErrors from '../utility/planErrorhandling';

function Plan(){

    const [openPanel, setOpenpanel] = useState(false);
    const {planBuilder, plans, checkingForAllUniquePlanNameBeforeFinilizing,checkingSubjectsListBeforeFinalizingPlan,popUpOnuserAddingSameNameSubjectsToNewPlan,clearDataAfterFinishedMakingTheplan, deleteTemporaryAddedSubs,addElementToArray, deleteWholePlan,finilizingPlan,LocallySettingTheCache} = planStore();
    const name = createRef()
    const date = createRef()
    const periority = createRef()
    const planName = createRef()
    const hour = createRef()



    useEffect(el=>{
        LocallySettingTheCache()
    }, [])

    function PanelControl(){
        setOpenpanel(openPanel=> !openPanel)
    }

    function addToPlan(el){
        el.preventDefault()

        {/* this is making form restrictions */}
        let res = planErrors(name.current.value, {title : "Provide subject name", des : 'please fill all the field before adding subject to plan'})
        if(!res){
            return ;
        }
        res = planErrors(date.current.value, {title : "Provide deadline date", des : 'please fill all the field before adding subject to plan'})
        if(!res){
            return ;
        }
        res = planErrors(periority.current.value, {title : "Provide priority to subject", des : 'please fill all the field before adding subject to plan'})
        if(!res){
            return ;
        }
        res = planErrors(hour.current.value, {title : "Provide hours to complete subject", des : 'please fill all the field before adding subject to plan'})
        if(!res){
            return ;
        }

        const notAllowingSameNameSubjects = popUpOnuserAddingSameNameSubjectsToNewPlan(name.current.value);
        if(!notAllowingSameNameSubjects){
            res = planErrors('', {title : "Name must be unique.", des : 'please provide unique name to your subject'})
            return 0;
        }
        {/* end of form restrictions */}
        
        const ElementToAdd = {
            name : name.current.value,
            date : date.current.value,
            periority : periority.current.value,
            hourCompleted : '',
            hour : hour.current.value
        }
        addElementToArray(planBuilder, ElementToAdd)

        name.current.value = '';
        date.current.value = '';
        periority.current.value = 'Must do';
    }

    function finilizingPlans(){
        {/* checking the restriction before adding plan to db */}
        const checkingSubjectsList = checkingSubjectsListBeforeFinalizingPlan();
        if(!checkingSubjectsList){
            planErrors('', {title : "Add subjects first", des : 'From above panel add subjects then finalze them.'})
            return 0;
        }

        let res = planErrors(planName.current.value, {title : "Add plan name on top.", des : 'Please provide plan name and it should be unique from other plans.'})
        if(!res){
            return 0;
        }
        
        const uniquePlanNameCheck = checkingForAllUniquePlanNameBeforeFinilizing(planName.current.value);
        console.log(uniquePlanNameCheck)
        if(!uniquePlanNameCheck){
            planErrors('', {title : "Plan name must be unique", des : `Please provide a unique name ${planName.current.value} already exists.`})
            return 0; 
        }
        {/* end of error restrictions */}


        const planDetail = {
            id : Math.trunc(Math.random()*10000000),
            name : planName.current.value,
            planSubs : planBuilder
        }
        finilizingPlan(plans,planDetail);
        clearDataAfterFinishedMakingTheplan();
        planName.current.value = ''
        
        setOpenpanel(openPanel=> !openPanel)
    }

    

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

    function deleteWholeSubPlan(event,el){
        console.log(el);
        deleteWholePlan(el)
    }

    function closeDistOfplans(){
        setOpenpanel(openPanel=> !openPanel)

    }

    function removeTempAddedSubs(event,el){
        deleteTemporaryAddedSubs(el);
    }

    return(
        <div className="plan">
            <div className='planfront pad16 flex flex-dir gap16'>
                <h2 className='head2'>Make plans</h2>
                <div className='flex flex-dir gap16 planpanelsheet'>
                    <div className={openPanel ? 'addnewplansOpen' :'addnewplansClose'}>
                        <div className='planName pad16 flex flex-1 gap16'>
                            <input ref={planName} className='inp_special' placeholder='plan name' type='text'  />
                            <button onClick={closeDistOfplans} className='closeBtnPlanDist'>close</button>
                        </div>
                        <div className='planForm pad16 flex flex-dir gap8'>
                            <input ref={name} className=' inp__' placeholder='subject name' type='text' />
                            <input ref={date} className='inp__' placeholder='Deadline' type='date' />
                            <select ref={periority} className='select inp__'>
                                {['Must do', 'Moderatelly do', 'Fun activity', 'diversify'].map(el=>
                                    <option value={el} className='opt'>{el}</option>
                                )}
                            </select>
                            <select ref={hour} className='select inp__'>
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(el=>
                                    <option value={el} className='opt'>{el} hour</option>
                                )}
                            </select>
                            <button onClick={addToPlan} className='addPlansub'>Add to plan</button>
                        </div>
                        <div className='plandisplay pad16 grid grid-2-col gap16'>
                            {planBuilder?.map(el=>
                                <div key={el.name} className='plansubs flex flex-1 flex-dir gap8'>
                                    <div className={`periorityBatch flex flex-2 ${periorityBtached(el.periority)}`}>
                                        <p className='per'>{el.periority}</p>
                                    </div>
                                    <p className='sublan'>{el.name.slice(0,10)}...</p>
                                    <p className='deadline'>Deadline by</p>
                                    <div className='flex flex-dir'>
                                        <p className='deadline'>{el.date}</p>
                                        <p className='deadline'>(YYYY-MM-DD)</p>
                                    </div>
                                    <button onClick={(event)=>removeTempAddedSubs(event,el)} className='removeTemp'>
                                        <img src={cross1} className='delicon' alt='delete'/>
                                    </button>
                                </div>
                            )}
                            <button onClick={finilizingPlans} className='addPlan'>Finilize plan</button>
                        </div>

                    </div>
                    <button onClick={PanelControl} className='pad16 planfrmae btn_add flex flex-2 gap8'>
                        <img src={add} className='icon_add' alt='settings'/>
                    </button>
                    {plans?.map(el=>
                        <div className='planDisplay flex flex-1 gap16 pad8'>
                            <Link to={`/plandetail/${el.id}`} key={el.id} className='pad16 planfrmae flex flex-2 gap8'>
                                <p className='nameofplan__'>{el.name.slice(0, 15)}</p>
                            </Link>
                            <button onClick={(event)=> deleteWholeSubPlan(event,el)} className='wholeplandelete'>
                                <img src={cross} alt='delete' className='del_icon_plan'/>
                            </button>
                        </div>
                    )}
                    {plans?.length == 0 &&
                        <div className='nonotes flex flex-dir flex-2'>
                            <img src={noNotes} alt='no notes found' className='noNotesIcon'/>
                            <div className='flex flex-dir gap16'>
                                <p className='noteNohead head2'>No <span>plans</span> found yet</p>
                                {/* <button onClick={AddNoteFun} className='AddNotes'>Notes +</button> */}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='menu__ pad8'>
                <Menu/>
            </div>
        </div>
    )
}

export default Plan;