import './App.css'

import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';


function App() {

  return (
    <>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
