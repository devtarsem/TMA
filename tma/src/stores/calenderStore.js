import {create} from 'zustand';


const calenderStore = create(
    (set)=>({
        displayNewEventPanel : true,
        eventAddedSuccessfully : false,
        alreadyExistingEvents : [],
        resetEventAddedStatus : ()=>{
            set({eventAddedSuccessfully : false})
        }
        ,
        openNewEventAddPanel : ()=>{
            set({displayNewEventPanel : true})
        },
        closeNewEventAddPanel : ()=>{
            set({displayNewEventPanel : false})
        },
        AddNewEvent : async(date, time, nameSel)=>{
            if(localStorage.getItem('calenderTMA')){
                let events = JSON.parse(localStorage.getItem('calenderTMA'));
                
                let counted = 0;
                events.forEach(el=>{
                    if(el.date === date){
                        el.eventsScheduled.push({
                            time,
                            name : nameSel
                        })
                        counted++;
                    }
                })

                if(!counted){
                    events = [...events, {
                        date,
                        eventsScheduled : [
                            {
                                time,
                                name : nameSel
                            }
                        ]
                    }]
                }
            
                localStorage.setItem('calenderTMA', JSON.stringify(events));
            }else{
                let events = [ {
                    date,
                    eventsScheduled : [
                        {
                            time,
                            name : nameSel
                        }
                    ]
                }]
                localStorage.setItem('calenderTMA', JSON.stringify(events));

            }
            set({eventAddedSuccessfully : true})
        }

        ,

        fetchExisitngEvents : async(date)=>{
            if(localStorage.getItem('calenderTMA')){
                let events = JSON.parse(localStorage.getItem('calenderTMA'));
                events = events.filter(el=>{
                    if(el.date === date){
                        return el;
                    }
                })
                console.log(events);
                set({alreadyExistingEvents : events})
            }
        }

        ,

        deleteASpecificEvent : (date, content)=>{
            let events = JSON.parse(localStorage.getItem('calenderTMA'));
            events.forEach(el=>{
                if(el.date === date){
                    el.eventsScheduled = el.eventsScheduled.filter(ele=>{
                        if(ele.name != content){
                            return ele
                        }
                    })
                    // return el;
                }
            })
            console.log(events);
            set({alreadyExistingEvents : events})
            localStorage.setItem('calenderTMA', JSON.stringify(events));

        }
    })
)

export default calenderStore;