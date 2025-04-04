import './../utility/util.css'
import './../styles/notes.css'
import { useState } from 'react';
import cross from './../icons/cancel.png'
import noteStore from '../stores/noteStores';
import { createRef , useEffect} from 'react';
import noNotes from './../icons/noNotes.png'
import planErrors from '../utility/planErrorhandling';

function Notes(){

    const [addNote, setAddNote] = useState(false);
    const {notesList, addNewNote, localNoteCaching, archieveNoteslist} = noteStore();
    useEffect(el=>{
        localNoteCaching()
    }, [])

    const note = createRef()
    const periority = createRef()


    function AddNoteFun(){
        setAddNote(addNote=> !addNote)
        
    }

    function addingNewNote(){
        let res = planErrors(note.current.value, {title:"Add notes content", des : "Please provide the important message that you want to add."})
        if(!res){
            return 0;
        }
        res = planErrors(periority.current.value, {title:"Add notes priority", des : "Please provide the priority to your note."})
        if(!res){
            return 0;
        }
        const newNote = {
            note : note.current.value,
            periority : periority.current.value,
            id : Math.trunc(Math.random()*100000000000)
        }
        addNewNote(newNote);
        setAddNote(addNote=> !addNote)
    }

    function archieveNote(event, el){
        archieveNoteslist(el)
    }

    return(
        <div className="notes pad16">
            <div className='flex flex-1 pad16'>
                <h2 className='head2'>Notes to <span>Complete</span></h2>
                {addNote ?
                    <button onClick={AddNoteFun} className='AddNotes'>close</button>
                
                :
                    <button onClick={AddNoteFun} className='AddNotes'>Notes +</button>
                }
            </div>
            <hr/>
            <div className='addedNotes flex flex-dir gap32'>
                {addNote &&
                    <div className='addNotePanel pad16 flex flex-dir gap16'>
                        <h2 className='head2 head2__'>Add <span>notes</span></h2>
                        <div className='form flex flex-dir gap16'>
                            <textarea ref={note} className="Note inp__" placeholder='Notes...' rows="10" cols="100%" ></textarea>
                            <select ref={periority}  className='select inp__'>
                                {['Must do', 'Moderatelly do', 'Fun activity', 'diversify'].map(el=>
                                    <option value={el} className='opt'>{el}</option>
                                )}
                            </select>
                            <button onClick={addingNewNote} className='addNoteBtn'>Add notes + </button>
                        </div>

                    </div>
                }
                {notesList?.map(el=>
                    <div className='note pad16'>
                        <p className='priority'>{el.periority}</p>
                        <button onClick={(event)=> archieveNote(event, el)} className='archievebtn'>Archieve</button>
                        <p className='notesAdded'>{el.note}</p>
                    </div>
                )}

                {notesList?.length === 0 &&
                    <div className='nonotes flex flex-dir flex-2'>
                        <img src={noNotes} alt='no notes found' className='noNotesIcon'/>
                        <div className='flex flex-dir gap16'>
                            <p className='noteNohead head2'>No <span>notes</span> found</p>
                            <button onClick={AddNoteFun} className='AddNotes'>Notes +</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Notes;