
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import SpaceView from './pages/SpaceView'
import { ProtectedRoute } from './ProtectedRoute'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute userOnly />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/space/:spaceId" element={<SpaceView />} />
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
