import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Component/Dashboard'
import Home from './Component/Home'
import MovableIcon from './Component/MovableIcon'
import Navbar from './Component/Navbar'

function App() {
  

  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>}></Route>
      <Route path='/MovableIcon' element={<MovableIcon/>}></Route>
    </Routes>
    
    </BrowserRouter>

      
        
   
    </div>
  )
}

export default App
