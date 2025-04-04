import './../utility/util.css'
import './../styles/todo.css'
import { Link } from 'react-router';
import Menu from './menu';
import todoStore from '../stores/todoStore';
import planStore from '../stores/planStore';
import { useEffect , createRef, useState} from 'react';
import del from './../icons/del.png'
import noNotes from './../icons/noNotes.png'
import planErrors from '../utility/planErrorhandling';

function Todo(){

    const {LocallySettingTheCache, plans} = planStore();
    const {LoadSelectedPlan, popUpOnuserAddingSameNameSubjectsToTODO,clearingTodoCacheOfYesterday, cachingTheFinishedTodoState,editingTheTodoList,finishedListBool,finishingTheTodoList,selectedPlanLoaded, LocalCacheTracing,listOfwork, deletingSubjectsFromPlansList,addingSubjectsFromPlansList} = todoStore();
    const planName = createRef()
    const [openDeeplist, setOpenDeepList] = useState(false)
    const [openPlanlist, setOpenPlanList] = useState(false)
    const work = createRef()
    const periority = createRef()
    const hours = createRef()
    const date = createRef()

    useEffect(el=>{
        LocallySettingTheCache();
        LocalCacheTracing();
        cachingTheFinishedTodoState();
        clearingTodoCacheOfYesterday();
    }, [])

    function LoadSelectedPlans(event){
        LoadSelectedPlan(event.target.textContent);
        setOpenDeepList(openDeeplist=> !openDeeplist);
    }

    function openPlansList(){
        setOpenPlanList(openPlanlist=> !openPlanlist)
        setOpenDeepList(openDeeplist=> false)
    }

    function checkBoxes(e, el){
        if(e.target.checked){
            addingSubjectsFromPlansList(el)
        }else{
            deletingSubjectsFromPlansList(el)
        }
    }

    function importComplete(){
        setOpenPlanList(openPlanlist=> false)
        setOpenDeepList(openDeeplist=> false)
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

    function deleteTodoItem(event,el){
        deletingSubjectsFromPlansList(el)

    }

    function MannuallyPushingInTodo(){
        let res = planErrors(work.current.value, {title : "Provide subject name", des : 'please fill all the field before adding subject to plan'})
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
        res = planErrors(hours.current.value, {title : "Provide hours to complete subject", des : 'please fill all the field before adding subject to plan'})
        if(!res){
            return ;
        }
        const notAllowingSameNameSubjects = popUpOnuserAddingSameNameSubjectsToTODO(work.current.value);
        if(!notAllowingSameNameSubjects){
            res = planErrors('', {title : "Name must be unique.", des : 'please provide unique name to your subject'})
            return 0;
        }

        const Element = {
            date : date.current.value,
            hour : hours.current.value,
            name : work.current.value,
            hourCompleted : '',
            periority : periority.current.value,
        }
        
        addingSubjectsFromPlansList(Element);
        work.current.value = '';
        date.current.value = '';

    }

    function finishingToDoList(){
        finishingTheTodoList();
    }
    function editTodoList(){
        editingTheTodoList();
    }

    function settingTheCurrentDateToCache(){
        let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
        localStorage.setItem('curr_date', JSON.stringify(date))
    }

    function BackToAllPlans(){
        setOpenDeepList(openDeeplist=> !openDeeplist);

    }

    return(
        
        <div className="TODO">
            <div className='front pad16'>
                <div className='todofront flex flex-dir gap16'>
                    <div className='dislplayworks pad16 flex flex-dir gap8'>
                        <div className='flex flex-1'>
                            <h2 className='todohead'>To do <span>{new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</span></h2>
                            {openPlanlist ?
                                <button onClick={openPlansList} className='addwork addwork_'>Close</button>
                            
                            :
                                <>
                                    {finishedListBool &&
                                        <button onClick={openPlansList} className='addwork addwork_'>Import plan</button>
                                    }
                                </>
                                    
                                
                            }

                            {finishedListBool ?
                                <button onClick={finishingToDoList} className='addwork addwork_'>Finish</button>

                            :
                                <button onClick={editTodoList} className='addwork addwork_'>Edit</button>
                            }

                            {/* <Link to='/pds' className='addwork addwork_'>Start PD's</Link> */}
                        </div>
                        <hr/>
                        <div className=' wrksflow flex-dir gap16'>
                            {openPlanlist &&
                                <div className='displayImportPlans pad16 flex flex-dir gap16'>
                                    {plans?.map(el=>
                                        <button onClick={LoadSelectedPlans} className='planslist flex flex-2'>
                                            {el.name}
                                        </button>
                                    )}
                                    {plans?.length==0 &&
                                        <div className='nonotes flex flex-dir flex-2'>
                                            <img src={noNotes} alt='no notes found' className='noNotesIcon'/>
                                            <div className='flex flex-dir gap16'>
                                                <p className='noteNohead head2'>No <span>plans</span> found yet</p>
                                                {/* <button onClick={AddNoteFun} className='AddNotes'>Notes +</button> */}
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                            {openDeeplist &&
                                <div className='displayImportPlans pad16  displayImportPlans__ pad16 flex flex-dir gap16'>
                                    <div className='flex flex-1'>
                                        <h2 className='head3 head3Small'>Import list from plans <span>{selectedPlanLoaded[0]?.name.slice(0,5)}.. / {selectedPlanLoaded[0]?.planSubs.length}</span></h2>
                                        <button onClick={BackToAllPlans} className='backBtn'>&larr; back</button>
                                    </div>
                                    <hr/>
                                    <div className='planlist flex flex-dir gap16'>
                                        {selectedPlanLoaded[0]?.planSubs.map(el=>
                                            <div className='planty flex flex-1 pad8'>
                                                <input onChange={(event)=> checkBoxes(event, el)} value="yes" className='inppp' type='checkbox'/>
                                                <div className='cover flex flex-dir flex-1 gap8'>
                                                    <p className='plannn'>Subject</p>
                                                    <p className='plannn'>{el.name}</p>
                                                </div>
                                                <div className='cover flex flex-dir flex-1 gap8'>
                                                    <p className='plannn'>Deadline</p>
                                                    <p className='plannn'>{el.date}</p>
                                                </div>
                                                <div className='cover flex flex-dir flex-1 gap8'>
                                                    <p className='plannn'>Periority</p>
                                                    <p className='plannn'>{el.periority}</p>
                                                </div>
                                            </div>
                                        )}
                                        <button onClick={importComplete} className='importBtn '>Import selected subjects</button>
                                    </div>
                                </div>
                            }

                            {listOfwork?.map(el=>
                                <div className='subs flex flex-dir gap8 pad8'>
                                    <button onClick={(event)=>deleteTodoItem(event, el)} className='deletebtn'>
                                        <img src={del} className='icon_del' alt='delete'/>
                                    </button>
                                    <div className='design_suu flex flex-1'></div>
                                    <p className='subject'>&mdash; {el.name} </p>
                                    <div className='flex'>
                                        <p className={`subject sub__`}>Priority &mdash;</p>
                                        <p className={`subject sub__ ${periorityBtached(el.periority)}`}>{el.periority}</p>
                                    </div>
                                    
                                </div>
                            )}

                            {listOfwork.length ==0 &&
                                <div className='nonotes flex flex-dir flex-2'>
                                    <img src={noNotes} alt='no notes found' className='noNotesIcon'/>
                                    <div className='flex flex-dir gap16'>
                                        <p className='noteNohead head2'>No <span>work</span> found yet</p>
                                        {/* <button onClick={AddNoteFun} className='AddNotes'>Notes +</button> */}
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    {finishedListBool ?
                        <div className='inpwork flex flex-dir gap16 pad16'>
                            <div className='flex flex-1 gap16'>
                                <input ref={work} className='inp__' placeholder='work' type='text'/>
                                <select ref={periority} className='select inp__'>
                                    {['Must do', 'Moderatelly do', 'Fun activity', 'diversify'].map(el=>
                                        <option value={el} className='opt'>{el}</option>
                                    )}
                                </select>
                            </div>
                            <div className='flex-1 flex gap16'>
                                <input ref={date} className='inp__' placeholder='date' type='date'/>
                                <select ref={hours} className='select inp__'>
                                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(el=>
                                        <option value={el} className='opt'>{el} hour</option>
                                    )}
                                </select>
                            </div>
                            <button onClick={MannuallyPushingInTodo} className='addwork'>Add to list</button>
                        </div>
                        :
                        <Link to='/pds' onClick={settingTheCurrentDateToCache} className='startPDs'>Start PD's</Link>   
                    }
                   
                </div>
            </div>
            <div className='menu__ pad8'>
                <Menu/>
            </div>

        </div>
    )
}

export default Todo;