import {create} from 'zustand';

const timerStore = create(
    (set)=>({
        currentPd : [],
        openSetting : false,
        progress : 0,
        hours_spended : 0,
        minutes_set : 10,
        second_set : 30,
        break_set : 0,
        big_break_set : 0,

        currentPDCaching : async()=>{
            const currPd = JSON.parse(localStorage.getItem('curr_pd'));
            set({currentPd : currPd})
        }
        ,
        openingSettings : async()=>{
            set({openSetting : true})
        }
        ,
        closeSettings : async()=>{
            set({openSetting : false})
        }
        ,
        settingTimeSpend : async(spendings)=>{
            
            const currPD = JSON.parse(localStorage.getItem('curr_pd'));
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            const AnalyticsList = JSON.parse(localStorage.getItem('analyticsList'));
            let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`

            // updating today todolist work done data            
            todoList.forEach(el=>{
                if(currPD.name === el.name){
                    currPD.hourCompleted = (currPD.hourCompleted == ''? 0:currPD.hourCompleted )+ 1; 
                    el.hourCompleted = (el.hourCompleted == ''? 0:el.hourCompleted) + 1; 
                }
            })
            localStorage.setItem('curr_pd', JSON.stringify(currPD));
            localStorage.setItem('todoList', JSON.stringify(todoList));
            
            // updating today todo data in analytics as well
            AnalyticsList.forEach(listItem=>{
                if(listItem.date === date){
                    listItem.list.forEach(particlarSubject=>{
                        if(particlarSubject.name ===currPD.name){
                            particlarSubject.hourCompleted = (particlarSubject.hourCompleted == ''? 0:particlarSubject.hourCompleted) + 1;
                        }
                    })
                }
            })
            localStorage.setItem('analyticsList', JSON.stringify(AnalyticsList));

            
            // set({hours_spended : spendings++})
        }
        ,
        progressCal : async(hourAlloted)=>{
            const currPD = JSON.parse(localStorage.getItem('curr_pd'));
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            let progress = 0;
            todoList.forEach(el=>{
                if(currPD.name === el.name){
                    progress = ((el.hourCompleted/2)/60)/Number(hourAlloted);
                }
            })
            set({progress : (progress*100)})
        }
        ,
        settingUpCredsForTimer : async()=>{
            if(!(localStorage.getItem('min_set'))){
                localStorage.setItem('min_set', 25);
            }
            if(!(localStorage.getItem('sec_set'))){
                localStorage.setItem('sec_set', 59);
            }
            if(!(localStorage.getItem('break_set'))){
                localStorage.setItem('break_set', 5);
            }
            if(!(localStorage.getItem('bigBreak_set'))){
                localStorage.setItem('bigBreak_set', 10);
            }
        }
        ,
        settingTimer : async()=>{
            set({minutes_set : 24, second_set : 59})
        }
        ,
        minutes_set_fun_add : async(newMin)=>{
            console.log('ddd')
            let mins = JSON.parse(localStorage.getItem('min_set'));
            mins = newMin + 1;
            localStorage.setItem('min_set', mins)
            set({minutes_set : mins});
            console.log(mins);
        }
        ,
        minutes_set_fun_minus : async(newMin)=>{
            console.log('ddd')
            let mins = JSON.parse(localStorage.getItem('min_set'));
            mins = newMin - 1;
            localStorage.setItem('min_set', mins)
            set({minutes_set : mins});
        }

    })
)

export default timerStore;