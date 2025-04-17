import React from 'react'
import './../styles/App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home  from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Create from './Create';
import LogOut from './LogOut';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/logout' element={<LogOut />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
