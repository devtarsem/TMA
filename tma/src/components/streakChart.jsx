import { Bar } from "react-chartjs-2";
import analyticsStore from "../stores/analytics";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


function BarChartStreak(){

    const {streakData, streakDataCalc} = analyticsStore();
    
    useEffect(el=>{
        streakDataCalc();
    }, [])

    const data = {
        labels: streakData.labels, // X-axis labels
        datasets: [
            {
                label: "Hour worked",
                data: streakData.hours_spend, // Y-axis values
                backgroundColor: ['white'],
                borderWidth: 1,
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
        },
        scales: {
            x: {
                ticks: {
                    color: "white", // X-axis labels ka color white
                },
            },
            y: {
                beginAtZero: true, // Y-axis 0 se start hoga
                ticks: {
                    color: "white", // Y-axis labels ka color white
                },
            },
        }
    
    };


    return(
        <div className="barchart grid grid-3-col gap8">
            {/* <div style={{ width: "40vh", height : "40vh", margin: "auto" }}>
                <Bar data={data} options={options} />
            </div> */}
            
        </div>
    )
}

export default BarChartStreak;