import {create} from 'zustand';

let analyticData = JSON.parse(localStorage.getItem('analyticsList'))
let todo = JSON.parse(localStorage.getItem('todoList'))
import DateToLabels from '../classes/dateToLabelDate';


const analyticsStore = create(
    (set)=>({
        streakData : {},
        doData1 : [],
        doData2 : [],
        subjectWiseTimespendData : [],
        TotalworkThisWeek : 0,
        dailySubsDistribution : {},
        weeklySubsWorkDistribution : {},
        last7DaysAvgTimeSpend : 0,

        streakDataCalc : async()=>{
            let hours = 0;
            let sreakDataNet = {
                labels : [],
                hours_spend : []
            }

            // let lastWeekData = [];
            // let added = 1;
            // if(analyticData.length > 7){
            //     if(added === 7){
            //         return;
            //     }
            //     for(let i = analyticData.length-1; i>0; i--){
            //         lastWeekData.push(analyticData[i])
            //         added++;
            //     }   
            //     analyticData = lastWeekData
            // }
            // console.log(lastWeekData)
            

            analyticData.forEach(eachDay=>{
                eachDay.list.forEach(subject=>{
                    hours = Number(subject.hourCompleted) + Number(hours);
                })
                const conversionDate = new DateToLabels()
                conversionDate.date = eachDay.date;
                const convertedDate = conversionDate.converstion()
                sreakDataNet.labels.push(convertedDate)
                sreakDataNet.hours_spend.push(Math.round(hours/120))
                hours = 0;
            })
            
            set({streakData : sreakDataNet})
            console.log(sreakDataNet)

            // total work last 7 days
            
            let last7daysWork = sreakDataNet.hours_spend.reduce((acc,curr)=> acc+curr, 0)
            set({TotalworkThisWeek : last7daysWork})

            // avg time per day in last week
            let avg = last7daysWork/7;
            set({last7DaysAvgTimeSpend : Math.floor(avg)})
        }

        ,

        dailyWorkDistribution : async()=>{
            let totalHours = 0;
            todo.forEach(el=>{
                totalHours = totalHours + Number(el.hour)
            })
            
            let dailyDistribution = {
                labels : [],
                percentagesAlloted : [] 
            }

            todo.forEach(el=>{
                dailyDistribution.labels.push(el.name);
                dailyDistribution.percentagesAlloted.push(((Number(el.hour) / totalHours)*100).toFixed(2));
            })

            set({dailySubsDistribution : dailyDistribution})

        }

        ,

        weeklySubsDistribution : async()=>{
            const allSubjsOfLast7Days = [];
            for(let i = analyticData.length-1; i>analyticData.length-8; i--){
                allSubjsOfLast7Days.push(...analyticData[i].list)
            }
            // console.log(allSubjsOfLast7Days)
            // consolidate all the unikue elements
            let totalSum = 0;
            let finalAnalyticList = {
                labels : [],
                hoursSpend : []
            }
            // for(let i = 0; i<allSubjsOfLast7Days.length; i++){
            //     totalSum = allSubjsOfLast7Days[i].hourCompleted;
            //     for(let j = i+1; i<allSubjsOfLast7Days.length-1; j++){
            //         if(allSubjsOfLast7Days[i].name == allSubjsOfLast7Days[j]){
            //             totalSum = totalSum + Number(allSubjsOfLast7Days[j].hourCompleted);
            //         }
            //     }
            //     finalAnalyticList.labels.push(allSubjsOfLast7Days[i].name)
            //     finalAnalyticList.hoursSpend.push(totalSum)
            // }
            let namesArr=['none'];

            allSubjsOfLast7Days.forEach(outer=>{
                if(!namesArr.includes(outer.name)){
                    totalSum = Number(outer.hourCompleted)
                    allSubjsOfLast7Days.forEach(inner=>{
                        console.log('padde')
                        if(outer.name === inner.name){
                            totalSum = totalSum + Number(inner.hourCompleted)
                        }
                    })
                    finalAnalyticList.labels.push(outer.name)
                    finalAnalyticList.hoursSpend.push((totalSum - outer.hourCompleted)/120)
                    namesArr.push(outer.name)
                }
                
            })
            set({weeklySubsWorkDistribution : finalAnalyticList})
            console.log(finalAnalyticList);

        }

        ,
        noAnalyticsData : false,

        handlingIfThereIsNoAnalytics : async()=>{
            if(!localStorage.getItem('analyticsList') ){
                set({noAnalyticsData : true})
            }else{
                set({noAnalyticsData : false})

            }
        }

    })
)

export default analyticsStore;