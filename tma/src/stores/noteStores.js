import {create} from 'zustand';

const noteStore = create(
    (set)=>({
        notesList : [],
        addNewNote : async(newNote)=>{
            if(localStorage.getItem('notes')){
                let notes = JSON.parse(localStorage.getItem('notes'))
                notes = [...notes, newNote]
                localStorage.setItem('notes', JSON.stringify(notes))
                set({notesList : notes})
            }else{
                set({notesList : [newNote]})
                localStorage.setItem('notes', JSON.stringify([newNote]))

            }
        }
        ,
        localNoteCaching :async()=>{
            const notes = JSON.parse(localStorage.getItem('notes'))
            set({notesList : notes})

        }
        ,
        archieveNoteslist : async(note)=>{
            let allNotes = JSON.parse(localStorage.getItem('notes'));
            allNotes=allNotes.filter(el=>{
                if(el.id != note.id){
                    return el
                }
            })
            localStorage.setItem('notes', JSON.stringify(allNotes))
            set({notesList : allNotes})
        
        }
    })
)

export default noteStore