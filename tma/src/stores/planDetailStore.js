import {create} from 'zustand'

const planDetailStore = create(
    (set)=>({
        planToShow : {
            
        },
        assignPlan : async(params)=>{
            const allPlans = JSON.parse(localStorage.getItem('PlanArrayTMA'))
            let filterplan = allPlans.filter(el=>{
                if(el.id === Number(params.id)){
                    return el;
                }
            })
            console.log(filterplan)
            set({planToShow : filterplan})
        }
        ,
        deletePlanParticularSubject : async(id, name,params)=>{
            let allPlans = JSON.parse(localStorage.getItem('PlanArrayTMA'))
            const filterplan = allPlans.filter(el=>{
                if(el.id === id){
                    return el;
                }
            })

            const updatedListOfSubjects = filterplan[0].planSubs.filter(el=>{
                if(el.name != name){
                    return el
                }
            })
            
            allPlans.forEach(el=>{
                if(el.id === id){
                    el.planSubs = updatedListOfSubjects
                }
            })

            let filteredPlan = allPlans.filter(el=>{
                if(el.id === Number(params.id)){
                    return el;
                }
            })
            set({planToShow : filteredPlan})

 
            localStorage.setItem('PlanArrayTMA', JSON.stringify(allPlans))
        }
    })
)

export default planDetailStore;