import {create} from 'zustand'

const planStore = create(
    (set) => ({
        plans : [],
        planBuilder : [],
        cachePlanName : '',
        addElementToArray : async(prevElements,Element)=>{
            if(prevElements==null){
                prevElements = []
            }
            let arr = [...prevElements, Element]
            localStorage.setItem('builderArrayTMA', JSON.stringify(arr))
            set({planBuilder : [...prevElements, Element]})
            // localStorage.setItem('cachePlanName',)
        },
        finilizingPlan : async(oldplans, detailedPlan)=>{
            if(oldplans==null){
                oldplans = []
            }
            let arr = [...oldplans,detailedPlan]
            localStorage.setItem('PlanArrayTMA', JSON.stringify(arr))
            set({plans : [...oldplans,detailedPlan]})
            localStorage.setItem('builderArrayTMA', JSON.stringify([]))
        },
        LocallySettingTheCache : async()=>{
            const cacheArr = JSON.parse(localStorage.getItem('builderArrayTMA'))
            const cacheArrbig = JSON.parse(localStorage.getItem('PlanArrayTMA'))

            set({planBuilder : cacheArr})
            set({plans : cacheArrbig})

        }
        ,
        deleteWholePlan : async(el)=>{
            let allPlans = JSON.parse(localStorage.getItem('PlanArrayTMA'))
            allPlans = allPlans.filter(plan=>{
                if(plan.id != el.id){
                    return plan;
                }
            })
            set({plans : allPlans})

            localStorage.setItem('PlanArrayTMA', JSON.stringify(allPlans))
        }
        ,
        deleteTemporaryAddedSubs : async(delItem)=>{
            console.log(delItem)
            let builderArrayTMA = JSON.parse(localStorage.getItem('builderArrayTMA'));
            builderArrayTMA = builderArrayTMA.filter(el=>{
                if(el.name != delItem.name){
                    return el;
                }
            }) 
            console.log(builderArrayTMA)
            localStorage.setItem('builderArrayTMA', JSON.stringify(builderArrayTMA))
            set({planBuilder : builderArrayTMA})

        }
        ,
        clearDataAfterFinishedMakingTheplan : async()=>{
            set({planBuilder : []})

        }
        ,
        popUpOnuserAddingSameNameSubjectsToNewPlan : (name)=>{
            if(!localStorage.getItem('builderArrayTMA')){
                return 1;
            }
            let alladdedSubs = JSON.parse(localStorage.getItem('builderArrayTMA'))
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
        ,
        checkingSubjectsListBeforeFinalizingPlan : ()=>{
            let alladdedSubs = JSON.parse(localStorage.getItem('builderArrayTMA'))
            if(alladdedSubs.length === 0){
                return 0;
            }else{
                return 1;
            }
        }
        ,
        checkingForAllUniquePlanNameBeforeFinilizing : (name)=>{
            let plans = JSON.parse(localStorage.getItem('PlanArrayTMA'));
            
            if(!plans){
                return 1;
            }
            else if(plans.length === 0){
                return 1;
            }else{
                plans = plans.filter(el=>{
                    if(el.name == name){
                        return el;
                    }
                })
                console.log(plans)
                if(plans.length===0){
                    return 1;

                }else{
                    return 0;

                }
            }
        }
    })
)

export default planStore;