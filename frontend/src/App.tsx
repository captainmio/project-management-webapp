import './App.css'

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';


function App() {

  return (
    <>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/main" element={<Main />} />
      </Routes>
    </>
  )
}

export default App
