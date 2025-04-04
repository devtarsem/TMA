import './../utility/util.css'
import './../styles/analytics.css'
import BarChartStreak from './streakChart';
import Donut from './donutChart';
import VerticalBar from './vertical_bar';
import arr from '../assets/dummyData';
import { useEffect } from 'react';
import analyticsStore from '../stores/analytics';
import PieChartForWeeklyDistribution from './piechart';
import noData from './../icons/nodata.svg'
import { Link } from 'react-router';

function Analytics(){

    
    const {TotalworkThisWeek, last7DaysAvgTimeSpend, noAnalyticsData,handlingIfThereIsNoAnalytics} = analyticsStore();
    useEffect(el=>{
        handlingIfThereIsNoAnalytics();
    }, [])

    const manipulator_factor_bars_to_extend_height = 1;

    return(
        <>
            {noAnalyticsData ?
                <div className='noAnlysisYet pad16 flex flex-dir gap16 flex-2'>
                    <img src={noData} className='noDatayet' alt='no data is there'/>
                    <h2 className='head2 head_center'>Start working your <span>Analytics</span> will be prepared simultaneously.</h2>
                    <Link className='link_navigate' to='/plan' >Start planning</Link>
                </div>
            :
                <div className="analytics pad16  gap16 flex-dir">
                    <div className='streak pad16'>
                        <h2 className='head2 head2__'>Daily <span>Streak</span>(hours)</h2>
                        <div className="bars">
                            <VerticalBar/>
                        </div>
                    </div>
                    <div className='grid grid-2-col gap16'>
                        <div className='last7DaysHours pad16'>
                            <div className='designDivs'></div>
                            <p className='last7'>Last 7 days <span>{TotalworkThisWeek}</span> Hours</p>
                        </div>
                        <div className='last7DaysHours pad16'>
                            <div className='designDivs'></div>
                            <p className='last7'>Avg last 7 days <br/> <span>{last7DaysAvgTimeSpend}</span> Hours</p>
                        </div>
                    </div>

                    {/* for today's work distribution */}
                    <div className="charts flex flex-dir gap8 pad16">
                        <h2 className='head2 head2__ donuthead'>Daily <span>Work distribution</span>(%)</h2>
                        <Donut/>
                    </div>
                    {/* for weekly work distribution */}

                    <div className="charts flex flex-dir gap8 pad16">
                        <h2 className='head2 head2__ donuthead noMarginHead'>Weekly <span>Work distribution</span>(hours)</h2>
                        <PieChartForWeeklyDistribution/>
                    </div>
                    
                </div>
            }
        </>
    )
}

export default Analytics;