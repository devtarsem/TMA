import {create} from 'zustand'

const todoStore = create(
    (set) => ({
        listOfwork : [],
        selectedPlanLoaded : [],
        finishedListBool : true,
        LoadSelectedPlan : async(name)=>{
            const cacheArrbig = JSON.parse(localStorage.getItem('PlanArrayTMA'))
            const loadedplan = cacheArrbig.filter(el=>{
                if(el.name == name){
                    return el;
                }
            })
            console.log(loadedplan)

            set({selectedPlanLoaded : loadedplan});
        },
        addingSubjectsFromPlansList : async(subject)=>{
            // setting up todo list for today
            if(localStorage.getItem('todoList')){
                let existingSubs = JSON.parse(localStorage.getItem('todoList'))
                existingSubs = [...existingSubs, subject]
                localStorage.setItem('todoList', JSON.stringify(existingSubs))
                set({listOfwork : existingSubs})
            }else{
                localStorage.setItem('todoList', JSON.stringify([subject]))
                set({listOfwork : [subject]})
            }

            // adding todo list to analytics list

            let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
            let count = 0;
            if(localStorage.getItem('analyticsList')){
                let existingList = JSON.parse(localStorage.getItem('analyticsList'))
                existingList.forEach(list_element=>{
                    if(list_element.date === date){
                        count++; // for tracking ki user ke list me aaj ke liye subs add hue he ya nahi
                        list_element.list = [...list_element.list, subject]
                    }
                })

                // checking if user have any subject for today itself
                if(!count){
                    existingList.push({
                        date : date,
                        list : [subject]
                    })
                }
                localStorage.setItem('analyticsList', JSON.stringify(existingList))
            }else{
                localStorage.setItem('analyticsList', JSON.stringify(
                    [{
                        date : date,
                        list : [subject]
                    }]
                ))
            }
        },
        deletingSubjectsFromPlansList : async(subject)=>{
            
            let existingSubs = JSON.parse(localStorage.getItem('todoList'))
            let existingAnalyticsList = JSON.parse(localStorage.getItem('analyticsList'))
            let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
            
            // deleting from the today todo list
            existingSubs = existingSubs.filter(el=>{
                if(el.name != subject.name){
                    return el;
                }
            })
            localStorage.setItem('todoList', JSON.stringify(existingSubs))
            set({listOfwork : existingSubs})

            // deleting from the analytics today todo list
            existingAnalyticsList.forEach(listItem=>{
                if(date === listItem.date){
                    listItem.list = listItem.list.filter(el=>{
                        if(el.name!= subject.name){
                            return el;
                        }
                    })
                }
            })
            localStorage.setItem('analyticsList', JSON.stringify(existingAnalyticsList))

        }
        ,
        LocalCacheTracing : async()=>{
            let existingSubs = JSON.parse(localStorage.getItem('todoList'))
            set({listOfwork : existingSubs ? existingSubs : []})

        }
        ,
        finishingTheTodoList : async()=>{
            localStorage.setItem('finishedList', false)
            set({finishedListBool : false})
        }
        ,
        editingTheTodoList : async()=>{
            localStorage.setItem('finishedList', true)
            set({finishedListBool : true})
        }
        ,
        cachingTheFinishedTodoState : async()=>{
            const bool = JSON.parse(localStorage.getItem('finishedList'))
            set({finishedListBool : bool ? bool : true})
        }
        ,
        clearingTodoCacheOfYesterday : async()=>{
            // agar current date he to todolist and analytics list hogi hee
            if(localStorage.getItem('curr_date')){
                const prev_date = JSON.parse(localStorage.getItem('curr_date'))
                const currentDate = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
                if(prev_date != currentDate){
                    localStorage.setItem('todoList', JSON.stringify([]))
                }
            }
        }
        ,
        popUpOnuserAddingSameNameSubjectsToTODO : (name)=>{
            let alladdedSubs = JSON.parse(localStorage.getItem('todoList'))
            alladdedSubs = alladdedSubs.filter(el=>{
                if(el.name === name){
                    return el;
                }
            })
            if(alladdedSubs.length === 0){
                return 1;
            }else{
                return 0;
            }
        }
    })
)

export default todoStore;