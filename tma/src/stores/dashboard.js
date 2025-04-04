import {create} from 'zustand';

const dashBoardStore = create(
    (set) => ({
        trackersData : {},
        consistency_track : [],
        resetTrack : false,
        setTrackers : async(day, hours)=>{
            const track = {
                days : day,
                time : hours,
                set_date : `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
            }
            localStorage.setItem('home_trackers', JSON.stringify(track))

            set({trackersData : track})
        }
        ,
        trackingConsistency : async()=>{
            const trackset_data = JSON.parse(localStorage.getItem('home_trackers'));
            const todo = JSON.parse(localStorage.getItem('todoList'));
            let hourscalc = 0;
            todo.forEach(el=>{
                hourscalc = hourscalc + Number(el.hourCompleted/120);
            })
            // hecking is the goal achieve
            let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
            if(hourscalc.toFixed(2) >= Number(trackset_data.time.split(' ')[0]).toFixed(2)){
                if(localStorage.getItem("consistency_marker")){
                    const marker = JSON.parse(localStorage.getItem('consistency_marker'))
                    
                    // ye dekh rahe he niche ki agar already aaj ka goal done he to kuch na ho
                    const markerCheck = marker.filter(el=>{
                        if(el.date == date){
                            return el;
                        }
                    })
                    if(markerCheck.length === 0){
                        let newMarkerMarks = {
                            date : date,
                            mark : true
                        }
                        let newConst = [...marker, newMarkerMarks];
                        localStorage.setItem('consistency_marker', JSON.stringify(newConst))
                    }
                }else{
                    let newMarkerMarks = {
                        date : date,
                        mark : true
                    }
                    let newConst = [ newMarkerMarks];
                    localStorage.setItem('consistency_marker', JSON.stringify(newConst))
                
                }
            }
        }

        ,

        cachingTheConsistencyTracker : async()=>{
            if(localStorage.getItem('consistency_marker')){
                set({consistency_track : JSON.parse(localStorage.getItem('consistency_marker'))})
            }else{
                set({consistency_track : []})

            }
        }
        ,
        checkingYesterdayWorkedOrNot : async()=>{
            let consistencyMarker = JSON.parse(localStorage.getItem('consistency_marker'))
            let lastWorkingday = consistencyMarker[consistencyMarker.length-1];
            let [day,month,year] = lastWorkingday.date.split('-').map(Number);
            
            let prevDate = new Date(year, month-1, day);

            let diff = Math.ceil((prevDate - new Date())/(1000*60*60*24));
            // diff me aaj ka din bhi consider ho raha he but aaj ka din to productive ho sakte he to usko minus - 1 kerna he
            const misisingdate = [];
            for(let i = 0; i<(-1*diff) - 1; i++){
                prevDate.setDate(prevDate.getDate()+1);
                let formatDate = prevDate.getDate() + "-" + (prevDate.getMonth() + 1) + "-" + prevDate.getFullYear();
                // misisingdate.push(formatDate);
                consistencyMarker = [...consistencyMarker, {date : formatDate, mark : false}]
                localStorage.setItem('consistency_marker', JSON.stringify(consistencyMarker))
            
            }
            console.log(misisingdate)
            let date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`

        }
        ,
        resetTracker : ()=>{
            localStorage.removeItem('consistency_marker');
            localStorage.removeItem('home_trackers');
            // set({resetTrack : true});
        }
    })
)

export default dashBoardStore;