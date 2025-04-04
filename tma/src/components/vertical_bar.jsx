import { Bar } from "react-chartjs-2";
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
import analyticsStore from "../stores/analytics";
import { useEffect, useState } from "react";

function VerticalBar(){
    const {streakData, streakDataCalc} = analyticsStore();
    const [loader, setLoader] = useState(false);
    
    useEffect(el=>{
        streakDataCalc();

    }, [])

    const data = {
        labels: streakData.labels, // X-axis labels
        datasets: [
            {
                label: "Subject wise hour spend",
                data: streakData.hours_spend, // Y-axis values
                backgroundColor: ["#ffad47", "#B771E5", "#00BBF0", "#FFF085", "#E52020", "#EAD196", '#fafafa', '#FFCCEA', "#94FFD8"],

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
        <div className="vbar">
            
            <div style={{ width: "100%", margin: "auto", padding: "20px", borderRadius: "10px" }}>
                <Bar data={data} options={options} />
            </div>
            
        </div>
    )
}

export default VerticalBar;