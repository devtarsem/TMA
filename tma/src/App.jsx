import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Display from './components/display'
import Dashboard from './components/dashboard'
import Todo from './components/todo'
import Plan from './components/plan'
import Pds from './components/pds'
import Counter from './components/counter'
import PlanDetails from './components/planDetails'
import Timer from './components/timer'
import Analytics from './components/analytics'
import Notes from './components/notes'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Display/>
  }
  ,
  {
    path : '/dashboard',
    element : <Dashboard/>
  }
  ,
  {
    path : '/todo',
    element : <Todo/>
  }
  ,
  {
    path : '/plan',
    element : <Plan/>
  }
  ,
  {
    path : '/pds',
    element : <Pds/>
  }
  ,
  {
    path : '/counter',
    element : <Counter/>
  }
  ,
  {
    path : '/plandetail/:id',
    element : <PlanDetails/>
  }
  ,
  {
    path : '/current-pd',
    element : <Timer/>
  }
  ,
  {
    path : '/analytics',
    element : <Analytics/>
  }
  ,
  {
    path : '/notes',
    element : <Notes/>
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
