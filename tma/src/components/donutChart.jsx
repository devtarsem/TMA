import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
import analyticsStore from "../stores/analytics";
import { useEffect } from "react";

function Donut(){

    const {dailyWorkDistribution, dailySubsDistribution, weeklySubsDistribution} = analyticsStore();

    useEffect(el=>{
        dailyWorkDistribution()
    }, [])

    const data = {
        labels: dailySubsDistribution.labels,
        datasets: [
            {
                data: dailySubsDistribution.percentagesAlloted, // Values
                backgroundColor: ["#ffad47", "#B771E5", "#00BBF0", "#FFF085", "#E52020", "#EAD196", '#fafafa', '#FFCCEA', "#94FFD8"],
                borderWidth: 0,
                hoverOffset: 5,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white", // Legend text color white
                },
            },
        }
        
    };
    return(
        <div className="donut flex flex-dir pad16">
            <div style={{ width: "100%", margin: "auto",  padding : '1.6rem',borderRadius: "1rem" }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}

export default Donut;