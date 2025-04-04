import React from "react";
import { Pie } from "react-chartjs-2";
import analyticsStore from "../stores/analytics";
import { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function PieChartForWeeklyDistribution(){

    const {dailyWorkDistribution, dailySubsDistribution, weeklySubsWorkDistribution,weeklySubsDistribution} = analyticsStore();

    useEffect(el=>{
        weeklySubsDistribution()

    },[])
    const data = {
        labels: weeklySubsWorkDistribution.labels, // X-axis labels
        datasets: [
            {
                label: "Sales",
                data: weeklySubsWorkDistribution.hoursSpend, // Y-axis values
                backgroundColor: ["#ffad47", "#B771E5", "#00BBF0", "#FFF085", "#E52020", "#EAD196", '#94FFD8', '#FFCCEA', "#fafafa"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: "white", // X-axis labels ka color white
                },
            },
            y: {
                ticks: {
                    color: "white", // Y-axis labels ka color white
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Grid lines ko light white kiya
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "white", // Legend ka text color white
                },
            }
            
        },
    };

    return(
        <div className="weeklyDistribution">
            <div style={{ width: "100%", margin: "auto",  padding: "20px", borderRadius: "10px" }}>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default PieChartForWeeklyDistribution