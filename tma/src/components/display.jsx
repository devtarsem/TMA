import './../utility/util.css'
import './../styles/display.css'
import dis from './../icons/dp.svg'
import { Link } from 'react-router'

function Display(){
    return(
        <div className="display flex flex-2 flex-dir pad16 gap16">
            <h2 className='head_display'>Boost Your Productivity, <br/> One Task at a Time</h2>
            <p className='des_dislay'>Plan smarter, work faster, and achieve more <br/> with our intellegent time management app.</p>
            <img src={dis} className='icon_display' alt='display image'/>
            {/* <h1 className='head_display biggerhead'> <span>kepl</span> <br/> is there for you. </h1> */}
            <div className='flex flex-2 flex-dir gap16'>
                <Link to='/dashboard' className='links linkBtn' >Let's get started</Link>
                {/* <Link to='/' className='links' >Does'nt have account? create now</Link> */}

            </div>
        </div>
    )
}

export default Display;