import './../utility/util.css'
import { Link } from 'react-router';
import sett from './../icons/setting.png'
import hour from './../icons/hourglass1.png'
import add from './../icons/add.png'
import todo from './../icons/todo1.png'
import ana from './../icons/ana.png'
import notes from './../icons/notes.png'
import work from './../icons/work.png'




function Menu(){
    return(
        <div className='menu flex flex-1'>
            <Link className='link flex flex-1 gap4 flex-dir' to='/dashboard'>
                <img src={hour} className='icon_menu' alt='settings'/>
                <p className='name'>Work</p>
            </Link>
            <Link className='link flex flex-1 gap4 flex-dir' to='/plan'>
                <img src={add} className='icon_menu' alt='settings'/>
                <p className='name'>Plan</p>
            </Link>

            <Link className='link flex flex-1 gap4 flex-dir' to='/todo'>
                <img src={todo} className='icon_menu' alt='settings'/>
                <p className='name'>To do</p>
            </Link>
            <Link className='link flex flex-1 gap4 flex-dir' to='/analytics'>
                <img src={ana} className='icon_menu icon__menu_small' alt='settings'/>
                <p className='name'>Analytics</p>
            </Link>
            <Link className='link flex flex-1 gap4 flex-dir' to='/pds'>
                <img src={work} className='icon_menu' alt='settings'/>
                <p className='name'>Do work</p>
            </Link>
            <Link className='link flex flex-1 gap4 flex-dir' to='/notes'>
                <img src={notes} className='icon_menu' alt='settings'/>
                <p className='name'>Notes</p>
            </Link>


        </div>
    )
}

export default Menu;