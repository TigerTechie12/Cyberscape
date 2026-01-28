
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import SpaceView from './pages/SpaceView'
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
<Route path="/login" element={<Login />} />
<Route path='/signup' element={<Signup />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/admin" element={<AdminPanel />} />
<Route path='/space' element={<SpaceView/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
