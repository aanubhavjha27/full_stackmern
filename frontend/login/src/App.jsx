import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './assets/Login'
import Signup from './assets/Signup'
import Homepage from './assets/Homepage'
import Privateroute from './assets/Privateroute'

const App = () => {
  console.log("React Loaded!");
  return (
    <div>

      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={
          <Privateroute>

            <Homepage/> 
          </Privateroute>}
            />
      </Routes>

    </div>
  )
}

export default App