import {create} from 'zustand'

const pdStore = create(
    (set)=>({
        subjects : '',
        hours_pending : '',
        sub_complete : '',
        ListOfSubjects : [],
        subsCompleted : 0,
        setUpTheList : async()=>{
            const todo = JSON.parse(localStorage.getItem('todoList'));
            set({
                ListOfSubjects : todo,
                subjects : todo.length
            })
        }
        ,
        settingUpCurrentPd : async(element)=>{
            localStorage.setItem('curr_pd', JSON.stringify(element))
        }
        ,
        settingSubjectCmpleted : async()=>{
            const todo = JSON.parse(localStorage.getItem('todoList'));
            let subjectCom = 0;
            todo.forEach(el=>{
                if(Number(el.hourCompleted)/2 > Number(el.hour)*60){
                    subjectCom++;
                }
            })
            console.log(subjectCom)
            set({subsCompleted : subjectCom})
        }

    })
)

export default pdStore;