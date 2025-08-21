import './App.css'

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectMain from './pages/Project/page';


function App() {

  return (
    <>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/main" element={<ProjectMain />} />
      </Routes>
    </>
  )
}

export default App
